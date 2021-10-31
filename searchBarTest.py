import sqlite3
import re

# If the keyword appears in several category, it will have higher hierarchy
def sort_data(keyword, data):

    set_hierachy = {
        4: [],
        3: [],
        2: [],
        1: []
    }
    sorted_result = []

    # setting hierarchy
    i = 0
    for definition, synnonyms, acronyms, terms in data:
        # Hierarchy 4: keyword matches 4 condition
        if keyword in definition and keyword in synnonyms and keyword in acronyms and keyword in terms:
            set_hierachy[4].append(data[i])
            i += 1

        # Hierarchy 3: keyword matches 3 condition
        elif (keyword in definition and keyword in synnonyms and keyword in acronyms 
            or keyword in definition and keyword in synnonyms and keyword in terms 
            or keyword in synnonyms and keyword in acronyms and keyword in terms):
            set_hierachy[3].append(data[i])
            i += 1

        # Hierarchy 2: keyword matches 2 condition
        elif (keyword in definition and keyword in synnonyms or keyword in definition and keyword in acronyms 
            or keyword in definition and keyword in terms or keyword in synnonyms and keyword in acronyms 
            or keyword in synnonyms and keyword in terms or keyword in acronyms and keyword in terms):
            set_hierachy[2].append(data[i])
            i += 1

        # Hierarchy 1: keyword matches 1 condition
        else:
            set_hierachy[1].append(data[i])
            i += 1

    j = 4
    while j > 0:
        sorted_result.extend(set_hierachy[j])
        j -= 1

    return sorted_result


# Take a keyword and return a list of tuples. Each tuple has corresponding terms, def, syn, and acr. None if no elements matched. 
def search(keyword):
    conn = sqlite3.connect('CinnamonList.db')
    test = conn.cursor()

    result = []
    test.execute("SELECT DISTINCT terms, definition, synnonyms, acronyms FROM data WHERE definition LIKE '%'||:key||'%' OR synnonyms LIKE '%'||:key||'%' OR acronyms LIKE '%'||:key||'%' OR terms LIKE '%'||:key||'%'", {'key': keyword})
    result = test.fetchall()

    if not result: 
        return None

    return sort_data(keyword, result)
