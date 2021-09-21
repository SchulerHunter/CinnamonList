import sqlite3
from functools import reduce
import operator

class databaseConnection:
    def __init__(self):
        self._hierarchy = {}
        self._ids = {}
        self.connectDB()

    def connectDB(self):
        try:
            conn = sqlite3.connect("../CinnamonList.db")
        except:
            exit
        return conn

    def setInHierarchy(self, keyMap):
        reduce(operator.getitem, keyMap[:-1], self._hierarchy)[keyMap[-1]] = {}

    def fetchItem(self, id):
        cursor = self.connectDB().cursor()
        cursor.execute(f"SELECT * FROM hierarchy WHERE id={id}")
        rows = cursor.fetchall()
        return rows[0]

    def fetchHierarchy(self):
        cursor = self.connectDB().cursor()
        cursor.execute("SELECT * FROM hierarchy")
        rows = cursor.fetchall()
        for row in rows:
            # Add item to id stack
            self._ids[row[0]] = {"title": row[2], "parent": row[1]}

            # Add item to hierarchy
            parent = row[1]
            parentStack = [row[0]]
            while parent is not None:
                parentStack.insert(0, parent)
                parent = self._ids[parent]["parent"]
            self.setInHierarchy(parentStack)

        return self._hierarchy
    
    def getHierarchy(self):
        if not self._hierarchy:
            self.fetchHierarchy()
        return self._hierarchy
    
    def getIDs(self):
        if not self._ids:
            self.fetchHierarchy()
        return self._ids