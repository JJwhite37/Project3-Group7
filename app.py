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
print('+------------------ POOL STATS ------------------+')
print("Pool CURRENT Effective Hashrate:", POOLOBJECT.stats().current_effective_hashrate)
print("Pool AVERAGE Effective Hashrate:", POOLOBJECT.stats().average_effective_hashrate)
print("Pool CURRENT Reported Hashrate:", POOLOBJECT.stats().current_reported_hashrate)
print("Pool Valid Shares:", POOLOBJECT.stats().valid_shares)
print("Pool Stale Shares:", POOLOBJECT.stats().stale_shares)
print("Pool Invalid Shares:", POOLOBJECT.stats().invalid_shares)
print("Pool balance:", POOLOBJECT.balance())
print('+------------------------------------------------+')

POOLSTATS = [POOLOBJECT.stats().current_effective_hashrate, # poolStats[0]
             POOLOBJECT.stats().average_effective_hashrate, # poolStats[1]
             POOLOBJECT.stats().current_reported_hashrate,  # poolStats[2]
             POOLOBJECT.stats().valid_shares,               # poolStats[3]
             POOLOBJECT.stats().stale_shares,               # poolStats[4]
             POOLOBJECT.stats().invalid_shares,             # poolStats[5]
             POOLOBJECT.balance()                           # poolStats[6]
            ]

print(POOLSTATS)





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

user_worker_info("sickist")


############################################################
#                     API INFO (END)                       #
############################################################
@APP.route('/', defaults={"filename": "index.html"})
@APP.route('/<path:filename>')
def index(filename):
    return send_from_directory('./build', filename)

@SOCKETIO.on('connect')
def on_connect():
    print('User connected!')

    # send currentMiners

    #currentMiners = getCurrentMineresAsArray()
    #print("Sending CurrentMiners data")
    #socketio.emit('currentMiners', currentMiners, broadcast=True, include_self=True)

    #socketio.emit('connection', poolStats, broadcast=True, include_self=True)

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
    print(str(data['userName']))
    print(str(data['userEmail']))
    print(str(data['userPic']))
    SOCKETIO.emit('Login', broadcast=True, include_self=True)
    current_miners = get_current_miners_as_array()
    print("Sending currentMiners data")
    SOCKETIO.emit('currentMiners', current_miners, broadcast=True, include_self=True)

    SOCKETIO.emit('connection', POOLSTATS, broadcast=True, include_self=True)

@SOCKETIO.on('Logout')
def on_logout():
    SOCKETIO.emit('Logout', broadcast=True, include_self=True)

def get_current_miners_as_array():
    current_miners = []

    for worker in POOLOBJECT.workers():
        current_miners.append([worker.worker_name, worker.stats().valid_shares])
    print(current_miners)
    return current_miners
if __name__ == '__main__':
    DATABASE.create_all()
    SOCKETIO.run(
        APP,
        host=os.getenv('IP', '0.0.0.0'),
        port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8081)),
    )
