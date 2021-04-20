''' MOCKED UNIT TESTS '''

import unittest
import unittest.mock as mock
from unittest.mock import patch
import os
import sys
import copy

sys.path.append(os.path.abspath('../../'))
from app import database
from app import Miner
import models

from app import add_miner_to_database
KEY_INPUT = 'username'
KEY_EXPECTED = 'expected'

INITIAL_USERNAME = Miner(email='JoeShmoe@njit.edu', worker_name='shmoe', valid_shares=120)

MINER1 = Miner(email='bigboss@gmail.edu', worker_name='Big Boss', valid_shares=150)
MINER2 = Miner(email='WhatsUpBro@whaaaaa.com', worker_name='waaaaasup', valid_shares=50)
MINER3 = Miner(email='brandomando@something.edu', worker_name='BrandoMando', valid_shares=12)

class DatabaseAddUserTestCase(unittest.TestCase):
    def setUp(self):
        self.successful_test_params = [
            {
                KEY_INPUT: MINER1,
                KEY_EXPECTED: [INITIAL_USERNAME, MINER1],
            },
            {
                KEY_INPUT: MINER2,
                KEY_EXPECTED: [INITIAL_USERNAME, MINER2],
            },
            {
                KEY_INPUT: MINER3 ,
                KEY_EXPECTED: [INITIAL_USERNAME, MINER3],
            },
        ]
        initial_Miner = Miner(email=INITIAL_USERNAME.email, worker_name=INITIAL_USERNAME.worker_name, valid_shares=INITIAL_USERNAME.valid_shares)
        
        self.INITIAL_db_mock = [initial_Miner.worker_name]
    
    def mocked_db_session_add(self, miner):
        self.INITIAL_db_mock.append(miner)
    
    def mocked_db_session_commit(self):
        return self.INITIAL_db_mock
    

    def test_add_user_success(self):
        print('Start of testing add_miner_to_database')
        for test in self.successful_test_params:
            self.INITIAL_db_mock = [INITIAL_USERNAME]
            print('Start of test:')
            with patch('app.database.session.add', self.mocked_db_session_add):
                with patch('app.database.session.commit', self.mocked_db_session_commit):

                    add_miner_to_database(test[KEY_INPUT])
                    actual_result = self.INITIAL_db_mock
                    expected_result = test[KEY_EXPECTED]
                    
                    print("\tA:\t",actual_result)
                    print("\tE:\t",expected_result)
                    print("\tM DB:\t",self.INITIAL_db_mock)
                    
                    # print("before asserts")
                    self.assertEqual(len(actual_result), len(expected_result))
                    for i in range(len(actual_result)):
                        self.assertEqual(actual_result[i], expected_result[i])
                    # print("after asserts")
            print('end of test\n')









'''


from app import getCurrentMinersAsArray
KEY_INPUT = 'input'
KEY_EXPECTED = 'expected'

INITIAL_POOL_WORKERS = ['EMAIL1', 1]

class GetCurrentMinersAsArrayUserTestCase(unittest.TestCase):
    def setUp(self):
        self.successful_test_params = [
            {
                KEY_INPUT: ['EMAIL2', 2],
                KEY_EXPECTED: [INITIAL_POOL_WORKERS, ['EMAIL2', 2]],
            },
            {
                KEY_INPUT: ['123ABC@RANDOM.EDU', 69420],
                KEY_EXPECTED: [INITIAL_POOL_WORKERS, ['123ABC@RANDOM.EDU', 69420]],
            },
            {
                KEY_INPUT: ['IHAVERABIES@MEDSCHOOL.EDU', 10000],
                KEY_EXPECTED: [INITIAL_POOL_WORKERS, ['IHAVERABIES@MEDSCHOOL.EDU', 10000]],
            },
        ]
  
        initial_MINER = INITIAL_POOL_WORKERS
        
        self.INITIAL_API_mock = [initial_MINER]
    
    def mocked_get_workers(self, INITIAL_API_mock):
        self.INITIAL_db_mock.append(username.username)
    

    def test_add_user_success(self):
        print('Start of testing getCurrentMinersAsArray')
        for test in self.successful_test_params:
            self.INITIAL_API_mock = [INITIAL_POOL_WORKERS]
            print('Start of test:')
            

            with patch('app.DB.session.add', self.mocked_db_session_add):
                with patch('app.DB.session.commit', self.mocked_db_session_commit):
       #             with patch('models.Player.query') as mocked_query:
    #                mocked_query.all = self.mocked_player_query_all()
                    getCurrentMinersAsArray(test[KEY_INPUT])
                    actual_result = self.INITIAL_db_mock
                    expected_result = test[KEY_EXPECTED]
                    
                    print("\tA:",actual_result)
                    print("\tE:",expected_result)
                    print("\tM DB:",self.INITIAL_db_mock)
                    
                    # print("before asserts")
                    self.assertEqual(len(actual_result), len(expected_result))
                    for i in range(len(actual_result)):
                        self.assertEqual(actual_result[i], expected_result[i])
                    # print("after asserts")
            print('end of test\n')




'''



if __name__ == '__main__':
    unittest.main()