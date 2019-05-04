# read-write-communicate
Prototype web-framework for doing student performance analysis using Flesch-Kincaid readability tests

# Dependencies
Python2.7 is required to run the flask app
The required python dependencies are stored in requirements file
```
$ pip2 installl -r requirements.txt
```
# Running in development mode
Before flask can run any commands, you need to set the `FLASK_APP` environment variable to `rwc.py`.

## Create DB
In order for the RWC web application to work the SQLite DB needs to be created:

```bash
$ flask db init
$ flask db upgrade
$ flask db migrate
```
## Generate Fake Users
A flask funtion has been created to generate fake students, faculty, classes, assignments, etc. To run execute:
```bash
$ flask fake
```
## Run web app
```bash
$ flask run
```
