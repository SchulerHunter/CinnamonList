from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def hello_world():
    return render_template("test.html", title="Hello, World!", username="World!")

@app.route("/<user>")
def hello_user(user):
    return render_template("test.html", title=f"Hello, {user}!", username=user)