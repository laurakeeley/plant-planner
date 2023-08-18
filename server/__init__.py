from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_login import LoginManager

db = SQLAlchemy()

#*initialze application
def create_app():
    app = Flask(__name__)
    bcrypt = Bcrypt(app)
    app.config['SECRET_KEY'] = 'sksjdksdjklsdjsldfeetewsvnh'
    app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://Joy:password@localhost:5432/plantplanner"
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