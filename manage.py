from flask_script import Manager
from flask import url_for
from app import create_app
app = create_app('default')
manager = Manager(app)


@manager.command
def hello():
    print("hello")


@manager.command
def list_routes():
    import urllib
    out = []
    for rule in app.url_map.iter_rules():
        options = {}
        for arg in rule.arguments:
            options[arg] = "[{0}]".format(arg)
        methods= ','.join(rule.methods)
        url=url_for(rule.endpoint, **options)
        line= urllib.unquote("{:50s}{:20s} {}".format(rule.endpoint, methods, url))
        out.append(line)
    for line in sorted(out):
        print(line)


if __name__ == "__main__":
    manager.run()
