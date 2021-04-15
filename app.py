import os
import flexpoolapi
from flask import Flask, send_from_directory, json, session
from flask_socketio import SocketIO
from flask_cors import CORS

app = Flask(__name__, static_folder='./build/static')

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
print(poolObject.current_hashrate())



for worker in poolObject.workers():
    print(worker.worker_name)


def userWorkerInfo(User):
    
    for worker in poolObject.workers():
        if (worker.worker_name == User):
            print("Workers CURRENT Effective Hashrate:", worker.stats().current_effective_hashrate)
            print("Workers AVERAGE Effective Hashrate:", worker.stats().average_effective_hashrate)
            print("Workers CURRENT Reported Hashrate:", worker.stats().current_reported_hashrate)
            print("Workers AVERAGE Reported Hashrate:", worker.stats().average_reported_hashrate)
            print("Workers Valid Shares:", worker.stats().valid_shares)
            print("Workers Stale Shares:", worker.stats().stale_shares)
            print("Workers Invalid Shares:", worker.stats().invalid_shares)
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

@socketio.on('connect')
def on_connect():
    print('User connected!')
    
    # send leaderboard
    leaderboard = getLeaderboardAsArray()
    print("Sending Leaderboard data")
    socketio.emit('leaderboard', leaderboard, broadcast=True, include_self=True)

@socketio.on('disconnect')
def on_disconnect():
    print('User disconnected!')


@socketio.on('testing')
def on_chat(): 
    print("testing works")
    socketio.emit('testing', broadcast=True, include_self=True)


def getLeaderboardAsArray():
    leaderboard = []
    
    for worker in poolObject.workers():
        leaderboard.append( [worker.worker_name, worker.stats().valid_shares] )
    print(leaderboard)
    return leaderboard

socketio.run(
    app,
    host=os.getenv('IP', '0.0.0.0'),
    port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8081)),
)
 
