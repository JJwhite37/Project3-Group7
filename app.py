import os
import flexpoolapi
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv, find_dotenv
from flask import Flask, send_from_directory, json, session
from flask_socketio import SocketIO
from flask_cors import CORS

load_dotenv(find_dotenv())

APP = Flask(__name__, static_folder='./build/static')

#------------------------------------------------------
#database info
DBNAME = os.getenv('DATABASE_URL')
print(str(os.getenv('DATABASE_URL')) + " this") ## test case
APP.config[
    'SQLALCHEMY_DATABASE_URI'] = DBNAME
APP.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

DATABASE = SQLAlchemy(APP)

import models
DATABASE.create_all()

Miner = models.get_miner_class(DATABASE)

#-----------------------------------------------------


CORS = CORS(APP, resources={r"/*": {"origins": "*"}})

SOCKETIO = SocketIO(
    APP,
    cors_allowed_origins="*",
    json=json,
    manage_session=False
)
############################################################
#                           API INFO (START)               #
############################################################

#The Adress of the flex pool were using to get stats
POOL_ID = "0xe3c1aB226b8Ebe645729590191E6505eF37a06Cb"

POOLOBJECT = flexpoolapi.miner(POOL_ID)

#TOTAL REPORTED AND EFFECTIVE HASH RATE
# print('+------------------ POOL STATS ------------------+')
# print("Pool CURRENT Effective Hashrate:", POOLOBJECT.stats().current_effective_hashrate)
# print("Pool AVERAGE Effective Hashrate:", POOLOBJECT.stats().average_effective_hashrate)
# print("Pool CURRENT Reported Hashrate:", POOLOBJECT.stats().current_reported_hashrate)
# print("Pool Valid Shares:", POOLOBJECT.stats().valid_shares)
# print("Pool Stale Shares:", POOLOBJECT.stats().stale_shares)
# print("Pool Invalid Shares:", POOLOBJECT.stats().invalid_shares)
# print("Pool balance:", POOLOBJECT.balance())
# print('+------------------------------------------------+')

POOLSTATS = [POOLOBJECT.stats().current_effective_hashrate, # poolStats[0]
             POOLOBJECT.stats().average_effective_hashrate, # poolStats[1]
             POOLOBJECT.stats().current_reported_hashrate,  # poolStats[2]
             POOLOBJECT.stats().valid_shares,               # poolStats[3]
             POOLOBJECT.stats().stale_shares,               # poolStats[4]
             POOLOBJECT.stats().invalid_shares,             # poolStats[5]
             POOLOBJECT.balance()                           # poolStats[6]
            ]

#print(POOLSTATS)

#INDIVIDUAL USER INFO
def user_worker_info(user):

    for worker in POOLOBJECT.workers():
        if worker.worker_name == user:
            print('+----------------- WORKER STATS -----------------+')
            print("Workers CURRENT Effective Hashrate:", worker.stats().current_effective_hashrate)
            print("Workers AVERAGE Effective Hashrate:", worker.stats().average_effective_hashrate)
            print("Workers CURRENT Reported Hashrate:", worker.stats().current_reported_hashrate)
            print("Workers AVERAGE Reported Hashrate:", worker.stats().average_reported_hashrate)
            print("Workers Valid Shares:", worker.stats().valid_shares)
            print("Workers Stale Shares:", worker.stats().stale_shares)
            print("Workers Invalid Shares:", worker.stats().invalid_shares)
            print('+------------------------------------------------+')
            #print("Workers Effective Hashrate: ", worker.current_hashrate()[0])
            #print("Workers Reported Hashrate: ", worker.current_hashrate()[1])
            #print("Stats:", worker.stats().valid_shares)
            #print("Daily Stats:", worker.daily_average_stats())
            #print("Chart:", worker.chart()[0])

#user_worker_info("sickist")


############################################################
#                     API INFO (END)                       #
############################################################






############################################################
#                     LEADERBOARD (start)                  #
############################################################

# METHODS
def add_miner_to_database(data):
    ''' Add miner to database '''
    miner = data #Miner(email=data[0], worker_name=data[1], valid_shares=data[2])
    DATABASE.session.add(miner)
    DATABASE.session.commit()

def delete_miner_to_database(data):
    ''' Delete miner from database '''
    miner = data #Miner(email=data[0], worker_name=data[1], valid_shares=data[2])
    DATABASE.session.delete(miner)
    DATABASE.session.commit()

def check_email_in_database(email, worker_name):
    print(Miner.query.filter_by(email=email, worker_name=worker_name).first())

    if Miner.query.filter_by(email=email, worker_name=worker_name).first() is None:
        # miner couldn't be found
        print(email, "-", worker_name, "connection not in database")
        return False
    else:
        # miner was found
        print(email, "-", worker_name, "connection not in database")
        return True

def populate_leaderboard_based_on_api():
    print()
    workers = POOLOBJECT.workers()
    #miners = [] unused variable
    for worker in workers:
        # check if new worker appeared
        if Miner.query.filter_by(worker_name=worker.worker_name).first() == None:
            # worker_name doesn't exist yet in our database, so add to database
            miner = Miner(email="", worker_name=worker.worker_name, valid_shares=worker.stats().valid_shares)
            add_miner_to_database(miner)

        else:
            # miner already exists, so update valid_shares
            miner_to_update = Miner.query.filter_by(worker_name=worker.worker_name).first()

            # add worker shares to miner shares to get updated valid_shares
            miner_to_update.valid_shares = miner_to_update.valid_shares + worker.valid_shares

            DATABASE.session.commit()

def get_leaderboard_as_array():
    leaderboard = Miner.query.order_by(Miner.valid_shares.desc()).all()

    array = []
    for miner in leaderboard:
        array.append([miner.email, miner.worker_name, miner.valid_shares])

    return array

QUERY = Miner.query.order_by(Miner.email).all()
print("DATABASE:\n", QUERY)

# create Miner
STANDARD_MINER = Miner(email="tester2@testing.om", worker_name="daDaddy", valid_shares=34)
add_miner_to_database(STANDARD_MINER)

QUERY = Miner.query.order_by(Miner.email).all()
print("DATABASE after adding:\n", QUERY)
delete_miner_to_database(STANDARD_MINER)

QUERY = Miner.query.order_by(Miner.email).all()
print("DATABASE after deleting:\n", QUERY)


#check Leaderboard
# populate_leaderboard_based_on_api()

############################################################
#                     LEADERBOARD (END)                    #
############################################################


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

@SOCKETIO.on('testing')
def on_chat():
    print("testing works")
    SOCKETIO.emit('testing', broadcast=True, include_self=True)

#anything that needs to be rendered on the dashboard has to go here
#anywhere else and it might not render properly, like leaderboard data
@SOCKETIO.on('Login')
def on_login(data):
    print(data)

    global STATUSLIST

    email = data['userEmail']
    print(email, "login")
    STATUSLIST = add_user_to_statuslist(email, STATUSLIST)


    SOCKETIO.emit('Login', broadcast=True, include_self=True)

    current_miners = get_current_miners_as_array()
    print("Sending currentMiners data")
    SOCKETIO.emit('currentMiners', current_miners, broadcast=True, include_self=True)


    leaderboard = get_leaderboard_as_array()
    print("Sending leaderboard data")
    SOCKETIO.emit('leaderboard', leaderboard, broadcast=True, include_self=True)


    SOCKETIO.emit('connection', POOLSTATS, broadcast=True, include_self=True)

@SOCKETIO.on('Logout')
def on_logout():
    global STATUSLIST
    email = ''

    STATUSLIST = remove_user_from_statuslist(email, STATUSLIST)
    SOCKETIO.emit('Logout', broadcast=True, include_self=True)

@SOCKETIO.on('LoginDatabaseCheck')
def on_login_database_check(data):
    ''' Do stuff based on if info is already in the database'''
    print(data)
    result = {}

    # get miner based on worker_name
    miner = Miner.query.filter_by(worker_name=data.worker_name).first()

    if miner.email == "":
        # if email is empty, that means we can update row with good email
        miner.email = data.email
        DATABASE.session.commit()

        # now continue login with updated database
        result['login'] = True
    else:
        # see if the email and worker_name are already part of the same row
        in_database = check_email_in_database(data.email, data.worker_name)
        if in_database == True: # means email and worker_name are correct
            # now continue login with no change in the database
            result['login'] = True
        else:
            # do not login correctly
            result['login'] = False

    # only send to client who emitted this check
    SOCKETIO.emit('LoginDatabaseCheck', result, broadcast=False, include_self=True)


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
        add_miner_to_current_miners([worker.worker_name, worker.stats().valid_shares], current_miners)

    print(current_miners)
    return current_miners

def get_workers():
    return POOLOBJECT.workers()


if __name__ == '__main__':
    SOCKETIO.run(
        APP,
        host=os.getenv('IP', '0.0.0.0'),
        port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8081)),
    )
