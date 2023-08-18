from flask import Blueprint, render_template, request, flash, jsonify
from flask_login import login_required, current_user

#! initialize blueprint, always need to pass in __name__, and the name of the blueprint
views = Blueprint("views", __name__)

@views.route("/", methods=['GET', 'POST'])
@login_required
def home():
    return "<h1>This is homepage for BE, and this is protected</h1>"