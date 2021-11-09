#!/usr/bin/python3

from flask import Flask
from flask_cors import CORS
from tools import database as DB

app = Flask(__name__)
CORS(app)

connection = DB.databaseConnection()

@app.route("/getHierarchy",methods = ['POST'])
def getHierarchy():
    # Returns id hierarchy of database items
    return connection.fetchHierarchy()

@app.route("/getIDs",methods = ['POST'])
def getIDs():
    return connection.getIDs()

@app.route("/getTabs",methods = ['POST'])
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
@app.route("/<int:id>",methods = ['POST'])
def fetch_id(id):
    return connection.getItem(id)

@app.route("/search/<key>",methods = ['POST'])
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