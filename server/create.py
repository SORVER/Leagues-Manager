import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv

db = SQLAlchemy()
app = Flask(__name__)
load_dotenv()

 # Set your secret key and database URI
app.config['SECRET_KEY'] = 'thisasecretkey'
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db.init_app(app)


def main():
    db.create_all()

if __name__ == "__main__":
    with app.app_context():
        try:
            main()
            print("Tables created successfully!")
        except Exception as e:
            print(f"Error creating tables: {e}")