import unittest
from tools import database as DB

class TestDBClass(unittest.TestCase):

    def test_class_create(self):
        # Tests that the class is created correctly
        connection = DB.databaseConnection()
        self.assertIsInstance(connection, DB.databaseConnection)

    def test_fetch_item(self):
        # Tests that the DB class can retrieve items by the correct ID
        connection = DB.databaseConnection()
        for i in range(1, 5):
            self.assertEqual(connection.fetchItem(i)["id"], i)

if __name__ == '__main__':
    unittest.main()