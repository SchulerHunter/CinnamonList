from flask import Flask, render_template
from tools import database as DB

app = Flask(__name__)

connection = DB.databaseConnection()

@app.route("/")
def index():
    hierarchy = connection.fetchHierarchy()
    ids = connection.getIDs()
    tabs = []
    for id in ids.keys():
        if id in hierarchy.keys():
            tabs.append((id, ids[id]["title"]))
    return render_template("index.html", tabs=tabs, hierarchy=hierarchy, ids=ids)

@app.route("/<int:id>")
def fetch_id(id):
    hierarchy = connection.getHierarchy()
    return render_template("definition.html", title=f"{connection.getIDs()[id]}", hierarchy=hierarchy)