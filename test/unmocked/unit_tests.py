''' UNMOCKED UNIT TESTS '''

import unittest
import os
import sys
import copy

sys.path.append(os.path.abspath('../../'))
from app import DBNAME
import models

from app import add_user_to_statuslist
KEY_INPUT = 'input'
KEY_EXPECTED = 'expected'

INIITIAL_USERLIST = ['A','B','C']
class UserListLoginTestCase(unittest.TestCase):
    def setUp(self):
        self.successful_test_params = [
            {
                KEY_INPUT: '',
                KEY_EXPECTED: ['A', 'B', 'C', ''],
            },
            {
                KEY_INPUT: 'Hello people',
                KEY_EXPECTED: ['A', 'B', 'C', 'Hello people'],
            },
            {
                KEY_INPUT: 'DEFG',
                KEY_EXPECTED: ['A', 'B', 'C', 'DEFG'],
            },
        ]
        self.initial_userlist = copy.deepcopy(INIITIAL_USERLIST)
    
    def test_add_user_success(self):
        print("Start testing for add_user_to_statuslist")
        for test in self.successful_test_params:
            self.initial_userlist = copy.deepcopy(INIITIAL_USERLIST)
            print("Start test")
            actual_result = add_user_to_statuslist(test[KEY_INPUT], self.initial_userlist)
            expected_result = test[KEY_EXPECTED]
            
            print("\tA:", actual_result)
            print("\tE:", expected_result)
            print("\tUL:", self.initial_userlist)
            
            self.assertEqual(len(actual_result), len(expected_result))
            
            for i in range(len(actual_result)):
                self.assertEqual(actual_result[i], expected_result[i])
            
            print("End test")    



from app import remove_user_from_statuslist
KEY_INPUT = 'input'
KEY_EXPECTED = 'expected'

INIITIAL_USERLIST = ['A','B','C']
class UserListLogoutTestCase(unittest.TestCase):
    def setUp(self):
        self.successful_test_params = [
            {
                KEY_INPUT: 'A',
                KEY_EXPECTED: ['B', 'C'], 
            },
            {
                KEY_INPUT: 'B',
                KEY_EXPECTED: ['A','C'], 
            },
            {
                KEY_INPUT: 'C',
                KEY_EXPECTED: ['A','B'],
            },
        ]
        self.initial_userlist = copy.deepcopy(INIITIAL_USERLIST)
    
    def test_logout_success(self):
        print("Start testing for remove_user_from_statuslist")
        for test in self.successful_test_params:
            self.initial_userlist = copy.deepcopy(INIITIAL_USERLIST)
            print("Start test")
            actual_result = remove_user_from_statuslist(test[KEY_INPUT], self.initial_userlist)
            expected_result = test[KEY_EXPECTED]
            
            print("\tA:", actual_result)
            print("\tE:", expected_result)
            print("\tUL:", self.initial_userlist)
            
            self.assertEqual(len(actual_result), len(expected_result))
            
            for i in range(len(actual_result)):
                self.assertEqual(actual_result[i], expected_result[i])
            
            print("End test") 

if __name__ == '__main__':
    unittest.main()