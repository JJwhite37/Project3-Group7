import os
import flexpoolapi
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv, find_dotenv
from flask import Flask, send_from_directory, json, session
from flask_socketio import SocketIO
from flask_cors import CORS

load_dotenv(find_dotenv())

app = Flask(__name__, static_folder='./build/static')

#------------------------------------------------------
#database info
DBNAME = os.getenv('DATABASE_URL')
print(str(os.getenv('DATABASE_URL')) + " this") ## test case
app.config[
    'SQLALCHEMY_DATABASE_URI'] = DBNAME
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

database = SQLAlchemy(app)

import models


#-----------------------------------------------------


cors = CORS(app, resources={r"/*": {"origins": "*"}})

socketio = SocketIO(
    app,
    cors_allowed_origins="*",
    json=json,
    manage_session=False
)
############################################################
#                           API INFO (START)               #
############################################################

#The Adress of the flex pool were using to get stats
POOL_ID = "0xe3c1aB226b8Ebe645729590191E6505eF37a06Cb"

poolObject = flexpoolapi.miner(POOL_ID)

#TOTAL REPORTED AND EFFECTIVE HASH RATE
print('+------------------ POOL STATS ------------------+')
print("Pool CURRENT Effective Hashrate:", poolObject.stats().current_effective_hashrate)
print("Pool AVERAGE Effective Hashrate:", poolObject.stats().average_effective_hashrate)
print("Pool CURRENT Reported Hashrate:", poolObject.stats().current_reported_hashrate)
print("Pool Valid Shares:", poolObject.stats().valid_shares)
print("Pool Stale Shares:", poolObject.stats().stale_shares)
print("Pool Invalid Shares:", poolObject.stats().invalid_shares)
print("Pool balance:", poolObject.balance())
print('+------------------------------------------------+')

poolStats = [poolObject.stats().current_effective_hashrate, # poolStats[0]
             poolObject.stats().average_effective_hashrate, # poolStats[1]
             poolObject.stats().current_reported_hashrate,  # poolStats[2]
             poolObject.stats().valid_shares,               # poolStats[3]
             poolObject.stats().stale_shares,               # poolStats[4]
             poolObject.stats().invalid_shares,             # poolStats[5]
             poolObject.balance()                           # poolStats[6]
]

print(poolStats)





#INDIVIDUAL USER INFO
def userWorkerInfo(User):
    
    for worker in poolObject.workers():
        if (worker.worker_name == User):
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
            
userWorkerInfo("sickist")


############################################################
#                     API INFO (END)                       #
############################################################
@app.route('/', defaults={"filename": "index.html"})
@app.route('/<path:filename>')
def index(filename):
    return send_from_directory('./build', filename)


statusList = []


@socketio.on('connect')
def on_connect():
    print('User connected!')
    
    # send currentMiners
    
    #currentMiners = getCurrentMineresAsArray()
    #print("Sending CurrentMiners data")
    #socketio.emit('currentMiners', currentMiners, broadcast=True, include_self=True)

    #socketio.emit('connection', poolStats, broadcast=True, include_self=True)
    
@socketio.on('disconnect')
def on_disconnect():
    print('User disconnected!')


@socketio.on('testing')
def on_chat(): 
    print("testing works")
    socketio.emit('testing', broadcast=True, include_self=True)
#anything that needs to be rendered on the dashboard has to go here
#anywhere else and it might not render properly, like leaderboard data
@socketio.on('Login')
def on_login(data): 
    global statusList
    
    print("Status List before append:", str(statusList))
    statusList = add_user_to_statuslist(data['userEmail'], statusList)
    print("Status List after append:", str(statusList))
    
    print(str(data['userName']))
    print(str(data['userEmail']))
    print(str(data['userPic']))
    socketio.emit('Login', broadcast=True, include_self=True)
    
    currentMiners = getCurrentMinersAsArray()
    print("Sending currentMiners data")
    socketio.emit('currentMiners', currentMiners, broadcast=True, include_self=True)

    socketio.emit('connection', poolStats, broadcast=True, include_self=True)
    
@socketio.on('Logout')
def on_logout(email):
    global statusList
    statusList = remove_user_from_statuslist(email, statusList)
    socketio.emit('Logout', broadcast=True, include_self=True)

def add_user_to_statuslist(email, status_list_copy):
    ''' adds username to logged in statusList '''
    status_list_copy.append(email)
    return status_list_copy

def remove_user_from_statuslist(email, status_list_copy):
    ''' Remove user from statusList'''
    status_list_copy.remove(email)
    return status_list_copy

def getCurrentMinersAsArray():
    currentMiners = []
    
    for worker in poolObject.workers():
        currentMiners.append( [worker.worker_name, worker.stats().valid_shares] )
    print(currentMiners)
    return currentMiners
    
if __name__ == '__main__':
    database.create_all()
    socketio.run(
        app,
        host=os.getenv('IP', '0.0.0.0'),
        port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8081)),
    )
 
