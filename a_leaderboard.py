import flexpoolapi

POOL_ID = "0xe3c1aB226b8Ebe645729590191E6505eF37a06Cb"
POOLOBJECT = flexpoolapi.miner(POOL_ID)

def add_miner_to_database(data, data_base):
    ''' Add miner to database '''
    miner = data #Miner(email=data[0], worker_name=data[1], valid_shares=data[2])
    data_base.session.add(miner)
    data_base.session.commit()

def delete_miner_to_database(data, data_base):
    ''' Delete miner from database '''
    miner = data #Miner(email=data[0], worker_name=data[1], valid_shares=data[2])
    data_base.session.delete(miner)
    data_base.session.commit()

def check_email_in_database(email, worker_name, miner):
    print(miner.query.filter_by(email=email, worker_name=worker_name).first())

    if miner.query.filter_by(email=email, worker_name=worker_name).first() is None:
        # miner couldn't be found
        print(email, "-", worker_name, "connection not in database")
        return False
    else:
        # miner was found
        print(email, "-", worker_name, "connection in database")
        return True

def populate_leaderboard_based_on_api(miner, data_base):
    workers = POOLOBJECT.workers()
    #miners = [] unused variable
    for worker in workers:
        # check if new worker appeared
        if miner.query.filter_by(worker_name=worker.worker_name).first() is None:
            # worker_name doesn't exist yet in our database, so add to database
            miner_worker = miner(email="", worker_name=worker.worker_name, valid_shares=worker.stats().valid_shares)
            add_miner_to_database(miner_worker, data_base)

        else:
            # miner already exists, so update valid_shares
            miner_to_update = miner.query.filter_by(worker_name=worker.worker_name).first()

            # add worker shares to miner shares to get updated valid_shares
            miner_to_update.valid_shares = miner_to_update.valid_shares + worker.valid_shares

            data_base.session.commit()

def get_leaderboard_as_array(miner):
    leaderboard = miner.query.order_by(miner.valid_shares.desc()).all()

    array = []
    for worker in leaderboard:
        array.append([worker.email, worker.worker_name, worker.valid_shares])

    return array
