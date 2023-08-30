from flask import Blueprint, render_template, request, flash, jsonify
from flask_login import login_required, current_user

from flask import Flask, request, jsonify
from server import create_app

from .auth import token_required

#! initialize blueprint, always need to pass in __name__, and the name of the blueprint
views = Blueprint("views", __name__)

@views.route("/", methods=['GET', 'POST'])
# @login_required
@token_required
def home():
    return jsonify({'message': 'This is a protected route in the auth blueprint'})

