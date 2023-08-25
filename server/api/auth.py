from flask import Blueprint, render_template, request, flash, redirect, url_for, jsonify, Flask
from ..models import User
from flask_bcrypt import generate_password_hash, check_password_hash

from .. import db
from flask_login import login_user, login_required, logout_user, current_user

import jwt
import datetime
from server import create_app


#! initialize blueprint, always need to pass in __name__, and the name of the blueprint
auth = Blueprint("auth", __name__)


@auth.route('/sign-up', methods=['GET', "POST"])
def sign_up():
    if request.method == "POST":
        data = request.json
        first_name = data.get('first_name')
        last_name = data.get('last_name')
        email = data.get('email')
        password = data.get('password')
        
        response = {}
        
        #*check to see if the email has been registered
        user = User.query.filter_by(email=email).first()
        if user:
            flash("Email has been registered", category='error')
            response = {'message': 'Email has been registered', 'status': 404}
        elif len(email) < 4:
            flash('Email must be greater than 3 characters', category='error')
        elif len(first_name) < 2:
            flash('First name must be greater than 1 character', category='error')
        elif len(password) < 4:
            flash('Password must be at least 4 characters', category='error')
        else:
            new_user = User(first_name=first_name, last_name= last_name, email=email, password=generate_password_hash(password).decode('utf-8'))
            db.session.add(new_user)
            db.session.commit()
            login_user(new_user, remember=True)
            flash('Account created!', category='success')
            response = {'message': 'User registered successfully', 'status': 200}
        return jsonify(response)
     
            
    return jsonify({'message': 'get method is not available', 'status': 400})


@auth.route('/login', methods=["GET", "POST"])
def login():
    #* user will be redirect to /login route and send FE message below to indicate user to login
    if request.method == "GET":
        return jsonify({'message': 'Please login', 'status': 400})
    elif request.method == "POST":
        data = request.json
        email = data.get('email')
        password = data.get('password')
        
        #*check if the email is valid in the db and return the first result
        user = User.query.filter_by(email=email).first()
        if user:
            if check_password_hash(user.password, password):
                flash("Logged in successfully!", category="success")
                #*flask remember tht user has logged in
                result = login_user(user, remember=True)
                app = create_app()
                expiration = datetime.datetime.utcnow() + datetime.timedelta(hours=1)
                token = jwt.encode({'user_id': user.id, 'expiration': expiration.strftime('%Y-%m-%d %H:%M:%S')}, app.config['SECRET_KEY'])
                print(f"token: {token}")
                response = {'message': 'login successfully', 'user_id': user.id, 'status': 200, 'token': token}
                print(f"response: {response}")
                return jsonify(response)
            else:
                #*login password do not match
                flash('Incorrect password, try again!', category='error')
                response = {'message': 'Invalid credentials','user_id': None, 'status': 401}
        else:
            response = {'message': 'No such user','user_id': None, 'status': 401}     
            flash('Email does not exist.', category='error') 
        return jsonify(response)
        