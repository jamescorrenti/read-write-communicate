import unittest
import time
from datetime import datetime
from app import create_app, db
from app.models import User, AnonymousUser, Role, Permission


def add_users():
    u1 = User(email='james.e.correnti@gmail.com', password='password')
    u2 = User(email='susan@example.org', password='dog')
    db.session.add(u1)
    db.session.add(u2)
    db.session.commit()


if __name__ == "__main__":
    add_users()
