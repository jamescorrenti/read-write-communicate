"""empty message

Revision ID: 15cbf33439df
Revises: 
Create Date: 2019-05-20 07:47:16.156620

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '15cbf33439df'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('revoked_tokens',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('jti', sa.String(length=120), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('roles',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=64), nullable=True),
    sa.Column('default', sa.Boolean(), nullable=True),
    sa.Column('permissions', sa.Integer(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )
    op.create_index(op.f('ix_roles_default'), 'roles', ['default'], unique=False)
    op.create_table('school',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=64), nullable=True),
    sa.Column('city', sa.String(length=64), nullable=True),
    sa.Column('state', sa.String(length=2), nullable=True),
    sa.Column('address', sa.String(length=64), nullable=True),
    sa.Column('country', sa.String(length=64), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_school_name'), 'school', ['name'], unique=False)
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('email', sa.String(length=64), nullable=False),
    sa.Column('username', sa.String(length=64), nullable=False),
    sa.Column('password_hash', sa.String(length=128), nullable=True),
    sa.Column('confirmed', sa.Boolean(), nullable=True),
    sa.Column('name', sa.String(length=64), nullable=True),
    sa.Column('avatar_hash', sa.String(length=32), nullable=True),
    sa.Column('type', sa.String(length=50), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_users_email'), 'users', ['email'], unique=True)
    op.create_index(op.f('ix_users_username'), 'users', ['username'], unique=True)
    op.create_table('faculty',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('faculty_name', sa.String(length=30), nullable=True),
    sa.ForeignKeyConstraint(['id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('school_user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('school_id', sa.Integer(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('start_date', sa.DateTime(), nullable=True),
    sa.Column('end_date', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['school_id'], ['school.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('student',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('student_name', sa.String(length=30), nullable=True),
    sa.Column('grade', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('class',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=30), nullable=True),
    sa.Column('teacher_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['teacher_id'], ['faculty.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('assignment',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('instructions', sa.Text(), nullable=True),
    sa.Column('due_date', sa.DateTime(), nullable=True),
    sa.Column('class_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['class_id'], ['class.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_assignment_due_date'), 'assignment', ['due_date'], unique=False)
    op.create_table('class_student',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('class_id', sa.Integer(), nullable=True),
    sa.Column('student_id', sa.Integer(), nullable=True),
    sa.Column('year', sa.Integer(), nullable=True),
    sa.Column('semester', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['class_id'], ['class.id'], ),
    sa.ForeignKeyConstraint(['student_id'], ['student.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('question',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('q', sa.Text(), nullable=True),
    sa.Column('answer', sa.Text(), nullable=True),
    sa.Column('assignment_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['assignment_id'], ['assignment.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('student_assignment',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('student_id', sa.Integer(), nullable=True),
    sa.Column('assignment_id', sa.Integer(), nullable=True),
    sa.Column('fk_ease', sa.Integer(), nullable=True),
    sa.Column('fk_grade', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['assignment_id'], ['assignment.id'], ),
    sa.ForeignKeyConstraint(['student_id'], ['student.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('student_assignment')
    op.drop_table('question')
    op.drop_table('class_student')
    op.drop_index(op.f('ix_assignment_due_date'), table_name='assignment')
    op.drop_table('assignment')
    op.drop_table('class')
    op.drop_table('student')
    op.drop_table('school_user')
    op.drop_table('faculty')
    op.drop_index(op.f('ix_users_username'), table_name='users')
    op.drop_index(op.f('ix_users_email'), table_name='users')
    op.drop_table('users')
    op.drop_index(op.f('ix_school_name'), table_name='school')
    op.drop_table('school')
    op.drop_index(op.f('ix_roles_default'), table_name='roles')
    op.drop_table('roles')
    op.drop_table('revoked_tokens')
    # ### end Alembic commands ###
