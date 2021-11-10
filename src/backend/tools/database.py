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
            conn = sqlite3.connect("CinnamonList.db")
        except:
            exit
        return conn

    # Uses an array of dictionary keys to map an item into a dictionary
    def setInHierarchy(self, keyMap):
        reduce(operator.getitem, keyMap[:-1], self._hierarchy)[keyMap[-1]] = {}

    # Returns the object associated to an item in the data table
    def fetchItem(self, id):
        cursor = self.connectDB().cursor()
        cursor.execute(f"SELECT * FROM data WHERE id={id}")
        term = cursor.fetchall()[0]
        return {"id": term[0], "term": term[1], "def": term[2], "syn": term[3], "acr": term[4]}

    # Returns the hierarchy of terms associated in the hierarchy table
    def fetchHierarchy(self):
        cursor = self.connectDB().cursor()
        cursor.execute("SELECT * FROM hierarchy")
        rows = cursor.fetchall()
        for row in rows:
            # Add item to id stack
            self._ids[row[0]] = {"term": row[2], "parent": row[1]}

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

    def getItem(self, id):
        return self.fetchItem(id)

    def searchKey(self, key):
        # Retrieve results from naive search
        cursor = self.connectDB().cursor()
        cursor.execute(f"SELECT id, term, definition, synonyms, acronyms FROM data WHERE definition LIKE '%{key}%' OR synonyms LIKE '%{key}%' OR acronyms LIKE '%{key}%' OR term LIKE '%{key}%'")
        results = cursor.fetchall()

        # Create a ranking of the number of matches in data
        rankedTerms = {1: [], 2: [], 3: [], 4:[]}
        for id, term, definition, synonyms, acronyms in results:
            boolList = [key in definition.lower(), key in synonyms.lower(), key in acronyms.lower(), key in term.lower()]
            count = sum(boolList)
            if count > 0:
                rankedTerms[count].append([id, term])
        
        return rankedTerms