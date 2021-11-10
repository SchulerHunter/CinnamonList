#!/usr/bin/python3

from flask import Flask
from flask_cors import CORS
from tools import database as DB

app = Flask(__name__)
CORS(app)

connection = DB.databaseConnection()

@app.route("/getHierarchy", methods = ['GET', 'POST'])
def getHierarchy():
    # Returns id hierarchy of database items
    return connection.fetchHierarchy()

@app.route("/getIDs", methods = ['GET', 'POST'])
def getIDs():
    return connection.getIDs()

@app.route("/getTabs", methods = ['GET', 'POST'])
def getTabs():
    # Retuns tabs from database
    ids = connection.getIDs()
    tabs = []
    # Create lists of tabs based on items with no parent item
    for id, info in ids.items():
        if info["parent"] is None:
            tabs.append((id, info["term"]))
    return {"root": tabs}

# Route for definition page
@app.route("/<int:id>",methods = ['GET', 'POST'])
def fetch_id(id):
    item = connection.getItem(id)
    item["syn"] = arrayDecode(item["syn"])
    item["acr"] = arrayDecode(item["acr"])
    return item

@app.route("/search/<key>",methods = ['GET', 'POST'])
def fetchSearch(key):
    return connection.searchKey(key.lower())

# Decodes stringified array back to array
def arrayDecode(string):
    arr = string.split(",")
    return arr

# Encodes array to string
def arrayEncode(arr):
    result = ",".join(arr)
    return result

if __name__ == "__main__":
    app.run()