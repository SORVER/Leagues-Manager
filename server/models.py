from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class League(db.Model):
    __tablename__ = 'League'
    League_ID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    League_Name = db.Column(db.String(50))
    clubs = db.relationship('Club', back_populates='league')
    games = db.relationship('Game', back_populates='league')

class Club(db.Model):
    __tablename__ = 'Club'
    Club_ID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    Club_Name = db.Column(db.String(50))
    Wins = db.Column(db.Integer, default=0)
    Loses = db.Column(db.Integer, default=0)
    Draws = db.Column(db.Integer, default=0)
    League_ID = db.Column(db.Integer, db.ForeignKey('League.League_ID'))
    league = db.relationship('League', back_populates='clubs')
    players = db.relationship('Player', back_populates='club')

class Player(db.Model):
    __tablename__ = 'Player'
    Player_ID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    Player_Name = db.Column(db.String(50))
    Position = db.Column(db.String(50))
    Goals = db.Column(db.Integer, default=0)
    Asists = db.Column(db.Integer, default=0)
    Club_ID = db.Column(db.Integer, db.ForeignKey('Club.Club_ID'))
    club = db.relationship('Club', back_populates='players')

class Game(db.Model):
    __tablename__ = 'Game'
    Match_ID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    Club1_Name = db.Column(db.String(50))
    Club2_Name = db.Column(db.String(50))
    History = db.Column(db.Date)
    Stadium = db.Column(db.String(50))
    Players_Assists = db.Column(db.Integer)
    Players_Goals = db.Column(db.Integer)
    Team1_Scores = db.Column(db.Integer)
    Team2_Scores = db.Column(db.Integer)
    League_ID = db.Column(db.Integer, db.ForeignKey('League.League_ID'))
    league = db.relationship('League', back_populates='games')

class Match_Result_Score(db.Model):
    __tablename__ = 'Match_Result_Score'
    Match_ID = db.Column(db.Integer, db.ForeignKey('Game.Match_ID'), primary_key=True)
    Player_ID = db.Column(db.Integer, db.ForeignKey('Player.Player_ID'), primary_key=True)
    Player_Num_Goals = db.Column(db.Integer)

class Match_Result_Assist(db.Model):
    __tablename__ = 'Match_Result_Assist'
    Match_ID = db.Column(db.Integer, db.ForeignKey('Game.Match_ID'), primary_key=True)
    Player_ID = db.Column(db.Integer, db.ForeignKey('Player.Player_ID'), primary_key=True)
    Player_Num_Asists = db.Column(db.Integer)

class Play_Match(db.Model):
    __tablename__ = 'Play_Match'
    Club1_ID = db.Column(db.Integer, db.ForeignKey('Club.Club_ID'), primary_key=True)
    Club2_ID = db.Column(db.Integer, db.ForeignKey('Club.Club_ID'), primary_key=True)
    Match_ID = db.Column(db.Integer, db.ForeignKey('Game.Match_ID'), primary_key=True)
