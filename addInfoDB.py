import sqlite3

conn = sqlite3.connect('CinnamonList.db')
test = conn.cursor()

test.execute("""INSERT INTO data (id, definition, synnonyms, acronyms)
                VALUES (1, 'auxiliary definition test', 'auxiliary synnonyms test', 'auxiliary acronyms test')""")

test.execute("""INSERT INTO data (id, definition, synnonyms, acronyms)
                VALUES (2, 'AFPR definition test', 'AFPR synnonyms test', 'AFPR acronyms test')""")

test.execute("""INSERT INTO data (id, definition, synnonyms, acronyms)
                VALUES (3, 'AFW definition test', 'AFW synnonyms test', 'AFW acronyms test')""")

test.execute("""INSERT INTO data (id, definition, synnonyms, acronyms)
                VALUES (4, 'AIFB definition test', 'AIFB synnonyms test', 'AIFB acronyms test')""")

test.execute("""INSERT INTO data (id, definition, synnonyms, acronyms)
                VALUES (5, 'TDAFP definition test', 'TDAFP synnonyms test', 'TDAFP acronyms test')""")

test.execute("""INSERT INTO data (id, definition, synnonyms, acronyms)
                VALUES (6, 'condensate storage tank definition test', 'condensate storage tank synnonyms test', 
                'condensate storage tank acronyms test')""")

test.execute("""INSERT INTO data (id, definition, synnonyms, acronyms)
                VALUES (7, 'CST definition test', 'CST synnonyms test', 'CST acronyms test')""")

test.execute("""INSERT INTO data (id, definition, synnonyms, acronyms)
                VALUES (8, 'CST pump definition test', 'CST pump synnonyms test', 'CST pump acronyms test')""")

test.execute("""INSERT INTO data (id, definition, synnonyms, acronyms)
                VALUES (9, 'CST sump definition test', 'CST sump synnonyms test', 'CST sump acronyms test')""")

test.execute("""INSERT INTO data (id, definition, synnonyms, acronyms)
                VALUES (10, 'cooling definition test', 'cooling synnonyms test', 'cooling acronyms test')""")

test.execute("""INSERT INTO data (id, definition, synnonyms, acronyms)
                VALUES (11, 'cooling water definition test', 'cooling water synnonyms test', 'cooling water acronyms test')""")

test.execute("""INSERT INTO data (id, definition, synnonyms, acronyms)
                VALUES (12, 'drains definition test', 'drains synnonyms test', 'drains acronyms test')""")

test.execute("""INSERT INTO data (id, definition, synnonyms, acronyms)
                VALUES (13, 'foundation drains definition test', 'foundation drains synnonyms test', 
                'foundation drains acronyms test')""")

test.execute("""INSERT INTO data (id, definition, synnonyms, acronyms)
                VALUES (14, 'lined concrete pits definition test', 'lined concrete pits synnonyms test', 
                'lined concrete pits acronyms test')""")

test.execute("""INSERT INTO data (id, definition, synnonyms, acronyms)
                VALUES (15, 'SDSP definition test', 'SDSP synnonyms test', 'SDSP acronyms test')""")

conn.commit()

conn.close()