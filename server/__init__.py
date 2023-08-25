from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_login import LoginManager
from dotenv import load_dotenv
import os
from .secrets import secrets


# Load environment variables from .env
load_dotenv()
secret_key = os.environ.get("SECRETE_KEY")
databse_uri = os.environ.get("DATABASE_URI")

db = SQLAlchemy()
#*initialze application
def create_app():
    app = Flask(__name__)
    # Configure CORS for all routes
    CORS(app)
    bcrypt = Bcrypt(app)
    app.config['SECRET_KEY'] = secret_key
    db_uri = secrets.get('postgre_db')
    app.config['SQLALCHEMY_DATABASE_URI'] = db_uri

    db.init_app(app)
    
    from .api.auth import auth
    app.register_blueprint(auth, url_prefix='/')
    
    from .api.views import views
    app.register_blueprint(views, url_prefix='/')
    
    
    #*load the models from db
    from .models import User, UserPlants
    
    with app.app_context():
        try:
            print("creating db")
            db.create_all()
        except Exception as e:
            print(f"An error occurred while creating the database: {e}")
    
    #!this is to create the gatekeeper
    login_manager = LoginManager()
    login_manager.login_view = 'auth.login'
    login_manager.init_app(app)
    
    @login_manager.user_loader
    def load_user(id):
        #*looking for primary key int(id)
        return User.query.get(int(id))
    
    return app

