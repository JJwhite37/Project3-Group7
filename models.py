from app import database


class Miner(database.Model):
    """db model"""
    id = database.Column(database.Integer, primary_key=True)

    email = database.Column(database.String(80), unique=True, nullable=True)

    worker_name = database.Column(database.String(80), unique=True, nullable=False)

    valid_shares = database.Column(database.Integer, unique=False, nullable=False)

    def __repr__(self):
        return '<Miner %r>' % self.username









