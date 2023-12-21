import os
from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
from models import *
from models import db
from flask_migrate import Migrate
from sqlalchemy import literal_column

app = Flask(__name__)

# Set your secret key and database URI
app.config['SECRET_KEY'] = 'thisasecretkey'
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db.init_app(app)
migrate = Migrate(app, db)

@app.route('/api/leagues')
def index():
    # Query for the first League_Name
    # SELECT Club_Name, (3*Wins + Draws) AS Points, League_ID FROM Club ORDER BY Points DESC;

    # Corrected query
    Clubs = db.session.query(
        Club.Club_Name,
        literal_column("(3*Wins + Draws)").label("Points"),
        Club.League_ID
    ).order_by(literal_column("Points").desc()).all()

    Leagues = db.session.query(League).all()

    tok = []
    for league in Leagues:
        clubs_list = []
        for club in Clubs:
            if league.League_ID == club.League_ID:
                clubs_list.append({'name': club.Club_Name, 'points': club.Points})
        tok.append({'name': league.League_Name, 'clubs': clubs_list})

    return jsonify(tok)

if __name__ == '__main__':
    app.run(debug=True)
