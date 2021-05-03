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
        print(email, "-", worker_name, "connection in database")
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