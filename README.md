https://ecom-miner.herokuapp.com/





# Flask and create-react-app (MinerMagic) - Group 7

## Requirements

1. `npm install`
2. `pip install -r requirements.txt`
3. `npm i react-google-login` in directory
## Setup

1. Run `echo "DANGEROUSLY_DISABLE_HOST_CHECK=true" > .env.development.local` in the project directory

## linting

1. E1101(no-member) - we felt this didn't add to code quality.
2. C0413(wrong-import-position) - we felt this didn't add to code quality.
3. W1508(invalid-envvar-default) - we felt this didn't add to code quality.
4. W0603(global-statement) - we wanted to have global variables
5. R0903(too-few-public-methods) - we felt this didn't add to code quality.
6. C0116(missing-function-docstring) - we felt that not every function needed a doc string, only certain ones
7. C0114(missing-module-docstring) - we felt that this docstring for the module wasn't neccessary
8. C0301(line-too-long) - we felt as long as the code wasn't too long its fine, we didn't need an arbitrary limit
9. R1705(no-else-return) - we felt this didn't add to code quality.
10. W0702(bare-except) - we felt this didn't add to code quality.
11. C0330(Wrong hanging indentation) - as long as the code wasn't too messy we felt we didn't need a specific format for hanging indentation

## Setup for Socket.io with Flask and ReactJS

1. Open Cloud9 terminal in `~/environment`. Run `pip install flask-socketio`
2. Run `pip install flask-cors`
3. `cd` into `react-starter` directory. Run `npm install socket.io-client --save`

## Setup for Database

1. Install PostGreSQL: `sudo yum install postgresql postgresql-server postgresql-devel postgresql-contrib postgresql-docs` Enter yes to all prompts.
2. Initialize PSQL database: `sudo service postgresql initdb`
3. Start PSQL: `sudo service postgresql start`
4. Make a new superuser: `sudo -u postgres createuser --superuser $USER` If you get an error saying "could not change directory", that's okay! It worked!
5. Make a new database: `sudo -u postgres createdb $USER` If you get an error saying "could not change directory", that's okay! It worked!
6. Make sure your user shows up:
   a) `psql`
   b) `\du` look for ec2-user as a user
   c) `\l` look for ec2-user as a database


7. Make a new user:
   a) `psql` (if you already quit out of psql)
   b) Type this with your username and password (DONT JUST COPY PASTE): `create user some_username_here superuser password 'some_unique_new_password_here';` e.g. `create user namanaman superuser password 'mysecretpassword123';`
   c) `\q` to quit out of sql
8. Save your username and password in a `sql.env` file with the format `SQL_USER=` and `SQL_PASSWORD=`.

## Create a new database on Heroku and connect to our code

1. In your terminal, go to the directory with `app.py`.
2. Let's set up a new remote Postgres database with Heroku and connect to it locally.

- Login and fill creds: `heroku login -i`
- Create a new Heroku app: `heroku create`
- Create a new remote DB on your Heroku app: `heroku addons:create heroku-postgresql:hobby-dev` (If that doesn't work, add a `-a {your-app-name}` to the end of the command, no braces)
- See the config vars set by Heroku for you: `heroku config`. Copy the value for DATABASE_URL
- Paste this value into your `.env` file in the following format: `export DATABASE_URL='copy-paste-value-in-here'`
  ### Use Python to update this new Database

3. In the terminal, run `python` to open up an interactive session. Let's initialize a new database and add some dummy data in it using SQLAlchemy functions. Then type in these Python lines one by one:

```
>> from app import db
>> import models
>> db.create_all()
>> Player = models.getPlayerClass(db)
>> admin = Player(username='admin', score=100)
>> guest = Player(username='guest', score=100)
>> db.session.add(admin)
>> db.session.add(guest)
>> db.session.commit()
```

4. In your same `python` session, let's now make sure that data was added successfully by doing some queries.

```
>> Player.query.all()
[<Player u'admin'>, <Player u'guest'>] # output
>> Player.query.filter_by(username='admin').first()
<Player u'admin'> # output
```

5. Now let's make sure this was written to our Heroku remote database! Let's connect to it using: `heroku pg:psql`
6. `\d` to list all our tables. `person` should be in there now.
7. Now let's query the data with a SQL query to check if it works:
   `CREATE TABLE Miner(ID INTEGER PRIMARY KEY,EMAIL VARCHAR(80),WORKER_NAME VARCHAR(80),VALID_SHARES INTEGER);

## Run Application

1. Run command in terminal (in your project directory): `python app.py`
2. Run command in another terminal, `cd` into the project directory, and run `npm run start`
3. Preview web page in browser '/'`

## Deploy to Heroku

1. Create a Heroku app: `heroku create --buildpack heroku/python`
2. Add nodejs buildpack: `heroku buildpacks:add --index 1 heroku/nodejs`
3. Push to Heroku: `git push heroku main`

