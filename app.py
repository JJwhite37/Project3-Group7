import os
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv, find_dotenv
from flask import Flask, send_from_directory, json, session
from flask_socketio import SocketIO
from flask_cors import CORS
import flexpoolapi
import api
import a_leaderboard

load_dotenv(find_dotenv())

APP = Flask(__name__, static_folder='./build/static')

#------------------------------------------------------
#database info
DBNAME = os.getenv('DATABASE_URL')
print(str(os.getenv('DATABASE_URL')) + " this") ## test case
APP.config[
    'SQLALCHEMY_DATABASE_URI'] = DBNAME
APP.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

DB_WORKING = True
try:
    DATABASE = SQLAlchemy(APP)
    import models
    DATABASE.create_all()
    Miner = models.get_miner_class(DATABASE)
except:
    DB_WORKING = False
#-----------------------------------------------------

print(DB_WORKING)

CORS = CORS(APP, resources={r"/*": {"origins": "*"}})

SOCKETIO = SocketIO(
    APP,
    cors_allowed_origins="*",
    json=json,
    manage_session=False
)
#The Adress of the flex pool were using to get stats
POOL_ID = "0xe3c1aB226b8Ebe645729590191E6505eF37a06Cb"

try:
    POOLOBJECT = flexpoolapi.miner(POOL_ID)
except:
    print('Flexpool API not working')

POOLSTATS = api.get_pool_stats()


@APP.route('/', defaults={"filename": "index.html"})
@APP.route('/<path:filename>')
def index(filename):
    return send_from_directory('./build', filename)


STATUSLIST = []

@SOCKETIO.on('connect')
def on_connect():
    print('User connected!')

@SOCKETIO.on('disconnect')
def on_disconnect():
    print('User disconnected!')

#anything that needs to be rendered on the dashboard has to go here
#anywhere else and it might not render properly, like leaderboard data
@SOCKETIO.on('Login')
def on_login(data):
    if DB_WORKING == False:
        login_backup()
    else:
        print(data)

        global STATUSLIST

        email = data['userEmail']
        username = data['userName']
        print(email, "login")
        STATUSLIST = add_user_to_statuslist(email, STATUSLIST)
        # logic for sign up, loginFlag = 0 means this is from sign up
        if data['loginFlag'] == 0:
            print("sign up")
            #check to see if a user already exists. if so throw error, send user back to main login page
            #needs to check both the email and username in DB
            #checking email
            if Miner.query.filter_by(email=email).first():
                error_message = "error during signup: account already exists"
                SOCKETIO.emit('LoginFail', error_message, broadcast=False, include_self=True)
                return
            #checking username
            elif Miner.query.filter_by(worker_name=username).first():
                error_message = "error during signup: account already exists"
                SOCKETIO.emit('LoginFail', error_message, broadcast=False, include_self=True)
                return
            else:
                #if user doesn't exist, then it will create a new user with email, username and set shares to 0
                db_user = Miner(email=email, worker_name=username, valid_shares=0)
                add_miner_to_database(db_user)
                query_database_for_email(email)
                #currently nothing is done with the current user, not sure if someone needs this
                current_user = {'email': email, 'username': username}
                print(current_user)

        # logic for sign in, loginFlag = 1 means this is from sign in
        if data['loginFlag'] == 1:
            print("sign in")
            #check to see if a user does not exist. if so throw error, send user back to main login page
            if Miner.query.filter_by(email=email).first() is None:
                error_message = "error during signin: account does not exists"
                SOCKETIO.emit('LoginFail', error_message, broadcast=False, include_self=True)
                return
            else:
                query_database_for_email(email)
                #currently nothing is done with the current user, not sure if someone needs this
                current_user = {'email': email, 'username': username}
                print(current_user)


        SOCKETIO.emit('Login', broadcast=False, include_self=True)

        current_miners = get_current_miners_as_array()
        print("Sending currentMiners data")
        SOCKETIO.emit('currentMiners', current_miners, broadcast=True, include_self=True)


        leaderboard = a_leaderboard.get_leaderboard_as_array(Miner)
        print(leaderboard)
        print("Sending leaderboard data")
        SOCKETIO.emit('leaderboard', leaderboard, broadcast=True, include_self=True)


        SOCKETIO.emit('connection', POOLSTATS, broadcast=True, include_self=True)

def add_miner_to_database(data):
    ''' Add miner to database '''
    miner = data #Miner(email=data[0], worker_name=data[1], valid_shares=data[2])
    DATABASE.session.add(miner)
    DATABASE.session.commit()

def query_database_for_email(email):
    ''' Query databse to check if email already exists '''
    if Miner.query.filter_by(email=email).first() is None:
        return False
    else:
        return True



def login_backup():
    SOCKETIO.emit('Login', broadcast=False, include_self=True)
    current_miners = get_current_miners_as_array()
    SOCKETIO.emit('currentMiners', current_miners, broadcast=True, include_self=True)
    leaderboard = [['', 'sickist', 381],
                   ['jrs95@njit.edu', 'CallMeClumsy', 0],
                   ['na354@njit.edu', 'abadio', 0]]
    SOCKETIO.emit('leaderboard', leaderboard, broadcast=True, include_self=True)


    SOCKETIO.emit('connection', POOLSTATS, broadcast=True, include_self=True)
@SOCKETIO.on('Logout')
def on_logout():
    global STATUSLIST
    #email = '' unused variable

    #STATUSLIST = remove_user_from_statuslist(email, STATUSLIST) not functional right now
    SOCKETIO.emit('Logout', broadcast=False, include_self=True)

@SOCKETIO.on('LoginDatabaseCheck')
def on_login_database_check(data):
    ''' Do stuff based on if info is already in the database'''
    print(data)
    if DB_WORKING == False:
        result = {}
        result['login'] = True
        SOCKETIO.emit('LoginDatabaseCheck', result, broadcast=False, include_self=True)
    else:
        result = {}

        # get miner based on worker_name
        miner = Miner.query.filter_by(worker_name=data['userName']).first()

        if miner.email == "":
            # if email is empty, that means we can update row with good email
            miner.email = data['userEmail']
            DATABASE.session.commit()

            # now continue login with updated database
            result['login'] = True
        else:
            # see if the email and worker_name are already part of the same row
            in_database = a_leaderboard.check_email_in_database(data['userEmail'], data['userName'], Miner)
            if in_database == True: # means email and worker_name are correct
                # now continue login with no change in the database
                result['login'] = True
            else:
                # do not login correctly
                result['login'] = False

        # only send to client who emitted this check
        SOCKETIO.emit('LoginDatabaseCheck', result, broadcast=False, include_self=True)


@SOCKETIO.on('UserInfo')
def on_worker_hover(data):
    print(data)
    userInfo = api.user_worker_info(data['name'])
    print(userInfo)
    SOCKETIO.emit('UserInfo', userInfo, broadcast=False, include_self=True)


def add_user_to_statuslist(email, status_list_copy):
    ''' adds username to logged in statusList '''
    status_list_copy.append(email)
    return status_list_copy

def remove_user_from_statuslist(email, status_list_copy):
    ''' Remove user from statusList'''
    status_list_copy.remove(email)
    return status_list_copy

def add_miner_to_current_miners(info, current_miners):
    current_miners.append(info)

def get_current_miners_as_array():
    current_miners = []

    workers = get_workers()
    for worker in workers:
        try:
            add_miner_to_current_miners([worker.worker_name, worker.stats().valid_shares], current_miners)
        except:
            add_miner_to_current_miners([worker[0], worker[1]], current_miners)
    print(current_miners)
    return current_miners

def get_workers():
    try:
        return POOLOBJECT.workers()
    except:
        return [['backup', 50]]

if __name__ == '__main__':
    SOCKETIO.run(
        APP,
        host=os.getenv('IP', '0.0.0.0'),
        port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8081)),
    )
