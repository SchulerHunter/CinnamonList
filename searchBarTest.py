import sqlite3
import re

# Take a keyword and return a list of tuples. Each tuple has corresponding def, syn, and acr. None is no elements matched. 
def search(keyword):
    conn = sqlite3.connect('CinnamonList.db')
    test = conn.cursor()

    result = []

    test.execute("SELECT DISTINCT definition, synnonyms, acronyms FROM data WHERE definition OR synnonyms OR acronyms LIKE '%'||:key||'%'", {'key': keyword})
    result = test.fetchall()
    if not result: result = None

    return result


# Test case
while(True):
    keyword = input("Enter a keyword: ")
    if keyword == "q": exit()
    result = search(keyword)

    [print("Definition: ", i[0], "\tSynnonyms: ", i[1], "\tAcronyms: ", i[2]) for i in result] if result is not None else print("Not found")
    print("--------------\n")