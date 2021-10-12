#!/usr/bin/python3

from flask import Flask, render_template
from tools import database as DB

app = Flask(__name__)

connection = DB.databaseConnection()

# Main route for page
@app.route("/")
def index():
    # Fetches hierarchies and ids from hierarchy database table
    hierarchy = connection.fetchHierarchy()
    ids = connection.getIDs()
    tabs = []
    # Create lists of tabs based on items with no parent item
    for id, info in ids.items():
        if info["parent"] is None:
            tabs.append((id, info["title"]))
    return render_template("index.html", tabs=tabs, hierarchy=hierarchy, ids=ids)

# Route for definition page
@app.route("/<int:id>")
def fetch_id(id):
    hierarchy = connection.getHierarchy()
    data = connection.getItem(id)
    return render_template("definition.html", title=f"{connection.getIDs()[id]}", hierarchy=hierarchy)

# Decodes stringified array back to array
def array_decode(string):
    arr = string.split()
    return arr

# Encodes array to string
def array_encode(arr):
    result = " ".join(arr)
    return result

if __name__ == "__main__":
    app.run()