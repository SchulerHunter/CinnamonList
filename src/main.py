from flask import Flask, render_template
from tools import database as DB

app = Flask(__name__)

connection = DB.databaseConnection()

@app.route("/")
def index():
    hierarchy = connection.fetchHierarchy()
    ids = connection.getIDs()
    tabs = []
    for id, info in ids.items():
        if info["parent"] is None:
            tabs.append((id, info["title"]))
    return render_template("index.html", tabs=tabs, hierarchy=hierarchy, ids=ids)

@app.route("/<int:id>")
def fetch_id(id):
    hierarchy = connection.getHierarchy()
    return render_template("definition.html", title=f"{connection.getIDs()[id]}", hierarchy=hierarchy)

# Array decode function
def array_decode(s):
    result = s.split()
    return result

# Array encode function
def array_encode(s):
    result = "".join(s)
    return result

# content = ''
# with open('filename') as f:
#     content = f.read()
