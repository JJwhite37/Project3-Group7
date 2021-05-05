import flexpoolapi

POOL_ID = "0xe3c1aB226b8Ebe645729590191E6505eF37a06Cb" #b
try:
    POOLOBJECT = flexpoolapi.miner(POOL_ID)
except:
    print('flexpool api not working')
def get_pool_stats():
    try:
        poolstats = [round((POOLOBJECT.stats().current_effective_hashrate/1000000), 2),   # poolStats[0]
                     round((POOLOBJECT.stats().average_effective_hashrate/1000000), 2),           # poolStats[1]
                     round((POOLOBJECT.stats().current_reported_hashrate/1000000), 2),            # poolStats[2]
                     POOLOBJECT.stats().valid_shares,                                            # poolStats[3]
                     POOLOBJECT.stats().stale_shares,                                            # poolStats[4]
                     POOLOBJECT.stats().invalid_shares,                                          # poolStats[5]
                     round((POOLOBJECT.balance()/1000000000000000000), 4),                        # poolStats[6]
                     (round((POOLOBJECT.balance()/1000000000000000000), 4)*2723)                  # poolStats[7]
                    ]
        return poolstats
    except:
        poolstats = [20.0, 20.0, 20.0, 50, 0, 0, .1, 500.000]
        return poolstats


def user_worker_info(user):
    try:
        for worker in POOLOBJECT.workers():
            if worker.worker_name == user:
                worker_stats = [round((worker.stats().current_effective_hashrate/1000000), 2),
                round((worker.stats().average_effective_hashrate/1000000), 2),
                round((worker.stats().current_reported_hashrate/1000000), 2),
                round((worker.stats().average_reported_hashrate/1000000), 2),
                worker.stats().valid_shares,
                worker.stats().stale_shares,
                worker.stats().invalid_shares
            ]
                return worker_stats
    except:
        worker_stats = [1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]
        return worker_stats
    return worker_stats
