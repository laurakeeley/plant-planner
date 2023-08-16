from flask import Flask
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'sksjdksdjklsdjsldfeetewsvnh'
    app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://Joy:password@localhost:5432/plantplanner"
    db.init_app(app)
    
    # from .api import api as api_blueprint
    # app.register_blueprint(api_blueprint, url_prefix='/api/')
    
    
    #*load the models from db
    from .models import User, UserPlants
    
    with app.app_context():
        try:
            print("creating db")
            db.create_all()
        except Exception as e:
            print(f"An error occurred while creating the database: {e}")
    
    
    return app