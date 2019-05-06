from random import randint, uniform
from sqlalchemy.exc import IntegrityError
from faker import Faker
from . import db
from .models import User, Assignment, StudentAssignment, Student, Faculty, ClassStudent, Class, SchoolUser, School, \
    Question
from faker.providers import BaseProvider


class RWCProvider(BaseProvider):
    def classes(self):
        _classes = ['Biology', 'Trig', '10th English', 'AP History']
        return _classes[randint(0, len(_classes) - 1)]

    def schools(self):
        _school = ["NorthEast HS", "Oak Hill HS", "WestLake MS", "Phil Mont Elementary", "School 3"]
        return _school[randint(0, len(_school) - 1)]


def school(count=2):
    fake = Faker()
    fake.add_provider(RWCProvider)
    i = 0
    while i < count:
        s = School(name=fake.schools(),
                   city=fake.city(),
                   state=fake.state_abbr(),
                   country=fake.country(),
                   address=fake.street_address())
        db.session.add(s)
        try:
            db.session.commit()
            i += 1
        except IntegrityError:
            db.session.rollback()


def students(count=100):
    fake = Faker()
    i = 0
    """
    #school_count = School.query.count()
    #if not school_count:
        school(2)
        school_count = 2
    """
    s = Student(email="test.student@example.com",
                username="student",
                password='password',
                confirmed=True,
                name="Student #1")
    db.session.add(s)
    db.session.commit()
    while i < count:
        # _school = School.query.offset(randint(0, school_count-1)).first()
        s = Student(email=fake.email(),
                    username=fake.user_name(),
                    password='password',
                    confirmed=True,
                    name=fake.name())
                    # schools=_school.id)
        db.session.add(s)
        try:
            db.session.commit()
            i += 1
        except IntegrityError:
            db.session.rollback()


def faculty(count=10):
    fake = Faker()
    i = 0
    while i < count:
        f = Faculty(email=fake.email(),
                    username=fake.user_name(),
                    password='password',
                    confirmed=True,
                    name=fake.name())
        db.session.add(f)
        try:
            db.session.commit()
            i += 1
        except IntegrityError:
            db.session.rollback()


def classes(count=20):
    fake = Faker()
    fake.add_provider(RWCProvider)
    faculty_count = Faculty.query.count()
    if not faculty_count:
        faculty(10)
        faculty_count = 10
    i = 0
    while i < count:
        t = Faculty.query.offset(randint(0, faculty_count-1)).first()
        c = Class(name=fake.classes(), teacher_id=t.id)
        db.session.add(c)
        try:
            db.session.commit()
            i += 1
        except IntegrityError:
            db.session.rollback()


def class_student(count=500):
    student_count = Student.query.count() - 1
    class_count = Class.query.count() - 1
    for i in range(count):
        s = Student.query.offset(randint(0, student_count)).first()
        c = Class.query.offset(randint(0, class_count)).first()
        s_c = ClassStudent(class_id=c.id, student_id=s.id)
        db.session.add(s_c)
        try:
            db.session.commit()
        except IntegrityError:
            db.session.rollback()


def assignments(count=100):
    fake = Faker()
    class_count = Class.query.count() - 1
    for i in range(count):
        c = Class.query.offset(randint(0, class_count)).first()
        a = Assignment(instructions=fake.text(),
                       due_date=fake.past_date(),
                       class_id=c.id)
        db.session.add(a)
    db.session.commit()


def student_assignments(count=1000):
    fake = Faker()
    student_count = Student.query.count() - 1
    assignment_count = Assignment.query.count() - 1
    for i in range(count):
        a = Assignment.query.offset(randint(0, assignment_count)).first()
        s = Student.query.offset(randint(0, student_count)).first()
        s_a = StudentAssignment(student_id=s.id,
                                #timestamp=fake.past_date(),
                                assignment_id=a.id,
                                fk_ease=uniform(0, 100),
                                fk_grade=uniform(0, 40))
        db.session.add(s_a)
    db.session.commit()


def school_users(count=2):
    fake = Faker()
    user_count = User.query.count() - 1
    school_count = School.query.count() - 1
    for i in range(count):
        for j in range(user_count):
            u = User.query.offset(j).first()
            s = School.query.offset(randint(0, school_count)).first()
            s_u = SchoolUser(school_id=s.id,
                             start_date=fake.past_date(),
                             end_date=fake.past_date(),
                             user_id=u.id)
            db.session.add(s_u)
    db.session.commit()


def questions(count=1000):
    fake = Faker()
    a_count = Assignment.query.count() -1
    for i in range(count):
        a = Assignment.query.offset(randint(0, a_count)).first()
        q = Question(q=fake.sentence(), assignment_id=a.id)
        db.session.add(q)
        try:
            db.session.commit()
        except IntegrityError:
            db.session.rollback()


if __name__ == "__main__":
    db.create_all()
    school()
    students()
    faculty()
    school_users()
    classes()
    class_student()
    assignments()
    student_assignments()
