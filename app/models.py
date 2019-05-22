from datetime import datetime
import hashlib
from werkzeug.security import generate_password_hash, check_password_hash
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer
from markdown import markdown
import bleach
from flask import current_app, request, url_for
from flask_login import UserMixin, AnonymousUserMixin
# from app.exceptions import ValidationError
from . import db, ma, login_manager
from marshmallow import fields, ValidationError


class Permission:
    CREATE_ASSIGNMENT = 4
    FOLLOW = 1
    QUESTION = 2
    WRITE = 4
    MODERATE = 8
    ADMIN = 16


class Role(db.Model):
    __tablename__ = 'roles'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), unique=True)
    default = db.Column(db.Boolean, default=False, index=True)
    permissions = db.Column(db.Integer)

    def __init__(self, **kwargs):
        super(Role, self).__init__(**kwargs)
        if self.permissions is None:
            self.permissions = 0

    @staticmethod
    def insert_roles():
        roles = {
            'User': [Permission.FOLLOW, Permission.QUESTION, Permission.WRITE],
            'Moderator': [Permission.FOLLOW, Permission.QUESTION,
                          Permission.WRITE, Permission.MODERATE],
            'Administrator': [Permission.FOLLOW, Permission.QUESTION,
                              Permission.WRITE, Permission.MODERATE,
                              Permission.ADMIN],
        }
        default_role = 'User'
        for r in roles:
            role = Role.query.filter_by(name=r).first()
            if role is None:
                role = Role(name=r)
            role.reset_permissions()
            for perm in roles[r]:
                role.add_permission(perm)
            role.default = (role.name == default_role)
            db.session.add(role)
        db.session.commit()

    def add_permission(self, perm):
        if not self.has_permission(perm):
            self.permissions += perm

    def remove_permission(self, perm):
        if self.has_permission(perm):
            self.permissions -= perm

    def reset_permissions(self):
        self.permissions = 0

    def has_permission(self, perm):
        return self.permissions & perm == perm

    def __repr__(self):
        return '<Role %r>' % self.name


class SchoolUser(db.Model):
    __tablename__='school_user'
    id = db.Column(db.Integer, primary_key=True)
    school_id = db.Column(db.Integer, db.ForeignKey('school.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user = db.relationship("User", back_populates="schools")
    school = db.relationship("School", back_populates="users")
    start_date = db.Column(db.DateTime(), default=datetime.utcnow)
    end_date = db.Column(db.DateTime(), default=datetime.utcnow)


class School(db.Model):
    __tablename__ = "school"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), index=True)
    city = db.Column(db.String(64))
    state = db.Column(db.String(2))
    address = db.Column(db.String(64))
    country = db.Column(db.String(64))
    users = db.relationship("SchoolUser", back_populates="school")


class User(UserMixin, db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(64), unique=True, index=True, nullable=False)
    username = db.Column(db.String(64), unique=True, index=True, nullable=False)
    # role_id = db.Column(db.Integer, db.ForeignKey('roles.id'))
    password_hash = db.Column(db.String(128))
    confirmed = db.Column(db.Boolean, default=False)
    name = db.Column(db.String(64))
    # location = db.Column(db.String(64))
    avatar_hash = db.Column(db.String(32))
    schools = db.relationship("SchoolUser", back_populates="user")
    type = db.Column(db.String(50), nullable=False)

    __mapper_args__ = {
        'polymorphic_identity': 'user',
        'polymorphic_on': type
    }
    
    def __init__(self, **kwargs):
        super(User, self).__init__(**kwargs)
        if self.email is not None and self.avatar_hash is None:
            self.avatar_hash = self.get_avatar_hash()

    @property
    def password(self):
        raise AttributeError('password is not a readable attribute')

    @password.setter
    def password(self, password):
        self.password_hash = generate_password_hash(password)

    def verify_password(self, password):
        return check_password_hash(self.password_hash, password)

    @staticmethod
    def reset_password(token, new_password):
        s = Serializer(current_app.config['SECRET_KEY'])
        try:
            data = s.loads(token.encode('utf-8'))
        except:
            return False
        user = User.query.get(data.get('reset'))
        if user is None:
            return False
        user.password = new_password
        db.session.add(user)
        return True

    def generate_email_change_token(self, new_email, expiration=3600):
        s = Serializer(current_app.config['SECRET_KEY'], expiration)
        return s.dumps(
            {'change_email': self.id, 'new_email': new_email}).decode('utf-8')

    def change_email(self, token):
        s = Serializer(current_app.config['SECRET_KEY'])
        try:
            data = s.loads(token.encode('utf-8'))
        except:
            return False
        if data.get('change_email') != self.id:
            return False
        new_email = data.get('new_email')
        if new_email is None:
            return False
        if self.query.filter_by(email=new_email).first() is not None:
            return False
        self.email = new_email
        self.avatar_hash = self.gravatar_hash()
        db.session.add(self)
        return True

    def can(self, perm):
        return True
        #return self.role is not None and self.role.has_permission(perm)

    def is_administrator(self):
        return self.can(Permission.ADMIN)

    def ping(self):
        self.last_seen = datetime.utcnow()
        db.session.add(self)

    def get_avatar_hash(self):
        return hashlib.md5(self.email.lower().encode('utf-8')).hexdigest()

    def avatar(self, size=100, default='identicon', rating='g'):
        url = 'https://secure.gravatar.com/avatar'
        hash = self.avatar_hash or self.get_avatar_hash()
        return '{url}/{hash}?s={size}&d={default}&r={rating}'.format(
            url=url, hash=hash, size=size, default=default, rating=rating)

    def __repr__(self):
        return '<User %r>' % self.username


class RevokedTokenModel(db.Model):
    __tablename__ = 'revoked_tokens'
    id = db.Column(db.Integer, primary_key=True)
    jti = db.Column(db.String(120))

    def add(self):
        db.session.add(self)
        db.session.commit()

    @classmethod
    def is_jti_blacklisted(cls, jti):
        query = cls.query.filter_by(jti=jti).first()
        return bool(query)


class Faculty(User):
    __tablename__ = 'faculty'
    id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
    # faculty_name = db.Column(db.String(30))
    classes = db.relationship("Class", back_populates="teacher")

    __mapper_args__ = {
        'polymorphic_identity': 'faculty'
    }


class ClassStudent(db.Model):
    __tablename__ = 'class_student'
    id = db.Column(db.Integer, primary_key=True)
    class_id = db.Column(db.Integer, db.ForeignKey('class.id'))
    student_id = db.Column(db.Integer, db.ForeignKey('student.id'))
    _class = db.relationship("Class", back_populates="students")
    student = db.relationship("Student", back_populates="classes")
    year = db.Column(db.Integer)
    semester = db.Column(db.Integer)


class StudentAssignment(db.Model):
    __tablename__ = 'student_assignment'
    id = db.Column(db.Integer, primary_key=True)
    submitted = db.Column(db.Boolean, default=False)
    submit_date = db.Column(db.DateTime)
    draft = db.Column(db.Boolean)
    student_id = db.Column(db.Integer, db.ForeignKey('student.id'))
    student = db.relationship("Student", back_populates="assignments")
    assignment = db.relationship("Assignment", back_populates="students")
    assignment_id = db.Column(db.Integer, db.ForeignKey('assignment.id'))

    # TODO: expand data statistics here
    fk_ease = db.Column(db.Float)
    fk_grade = db.Column(db.Float)


class Student(User):
    __tablename__ = 'student'
    id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
    # student_name = db.Column(db.String(30))
    classes = db.relationship("ClassStudent", back_populates="student")
    assignments = db.relationship("StudentAssignment", back_populates="student")
    grade = db.Column(db.Integer)
    __mapper_args__ = {
        'polymorphic_identity': 'student'
    }


class Class(db.Model):
    __tablename__ = "class"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30))
    students = db.relationship("ClassStudent", back_populates="_class")
    teacher_id = db.Column(db.Integer, db.ForeignKey('faculty.id'))
    teacher = db.relationship("Faculty", back_populates="classes")
    assignments = db.relationship("Assignment", back_populates="_class")
    # year = db.Column(db.Integer)
    # semester = db.Column(db.Integer)


class AnonymousUser(AnonymousUserMixin):
    def can(self, permissions):
        return False

    def is_administrator(self):
        return False


login_manager.anonymous_user = AnonymousUser


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


class Assignment(db.Model):
    __tablename__ = 'assignment'
    id = db.Column(db.Integer, primary_key=True)
    instructions = db.Column(db.Text)
    name = db.Column(db.Text)
    due_date = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    class_id = db.Column(db.Integer, db.ForeignKey('class.id'), nullable=False)
    _class = db.relationship("Class", back_populates="assignments")
    questions = db.relationship("Question", back_populates="assignment")
    students = db.relationship("StudentAssignment", back_populates="assignment")


class Question(db.Model):
    __tablename__ = 'question'
    id = db.Column(db.Integer, primary_key=True)
    q = db.Column(db.Text)
    answer = db.Column(db.Text)
    assignment = db.relationship("Assignment", back_populates="questions")
    assignment_id = db.Column(db.Integer, db.ForeignKey('assignment.id'))


class QuestionSchema(ma.ModelSchema):
    class Meta:
        model = Question


class UserSchema(ma.ModelSchema):
    class Meta:
        model = User
        # model_fields_kwargs = {'password_hash': {'load_only': True}}


class SchoolUserSchema(ma.ModelSchema):
    class Meta:
        model = SchoolUser


class FacultySchema(ma.ModelSchema):
    class Meta:
        model = Faculty


class ClassSchema(ma.ModelSchema):
    class Meta:
        model = Class
    teacher = ma.Nested(FacultySchema, exclude=['password_hash'])


class AssignmentSchema(ma.ModelSchema):
    class Meta:
        model = Assignment

    _class = ma.Nested(ClassSchema, exclude=['students'])
    #class_id = fields.Int()


class StudentSchema(ma.ModelSchema):
    class Meta:
        model = Student

class SchoolSchema(ma.ModelSchema):
    class Meta:
        model = School


class ClassStudentSchema(ma.ModelSchema):
    class Meta:
        model = ClassStudent


class StudentAssignmentSchema(ma.ModelSchema):
    class Meta:
        model = StudentAssignment
    assignment = ma.Nested(AssignmentSchema, exclude=['students'])

# db.event.listen(Question.body, 'set', Question.on_changed_body)
