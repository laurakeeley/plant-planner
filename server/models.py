#* . means __init__.py, db is from that file
from . import db
from flask_login import UserMixin



class UserPlants(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    plant_details = db.Column(db.JSON)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True) 
    first_name = db.Column(db.String(150))
    last_name = db.Column(db.String(150))
    #* unique = true means that no other users can have the same email
    email = db.Column(db.String(150), unique=True)
    password = db.Column(db.String(150))
    plants = db.relationship('UserPlants')