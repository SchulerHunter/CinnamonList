#!/usr/bin/python3

from flask import Flask, render_template
from tools import database as DB

app = Flask(__name__)

connection = DB.databaseConnection()

@app.route("/getHierarchy")
def getHierarchy():
    # Returns id hierarchy of database items
    return connection.fetchHierarchy()

@app.route("/getIDs")
def getIDs():
    return connection.getIDs()

@app.route("/getTabs")
def getTabs():
    # Retuns tabs from database
    ids = connection.getIDs()
    tabs = []
    # Create lists of tabs based on items with no parent item
    for id, info in ids.items():
        if info["parent"] is None:
            tabs.append((id, info["title"]))
    return {"root": tabs}

# Route for definition page
@app.route("/<int:id>")
def fetch_id(id):
    return connection.getItem(id)

@app.route("/search/<key>")
def fetchSearch(key):
    return connection.searchKey(key)

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