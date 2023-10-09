from flask import Blueprint, render_template, request, flash, jsonify
from flask_login import login_required, current_user

from flask import Flask, request, jsonify
from server import create_app

from .auth import token_required

#! initialize blueprint, always need to pass in __name__, and the name of the blueprint
views = Blueprint("views", __name__)

@views.route("/getPlants", methods=['GET'])
# @token_required
def profile():
    return jsonify({'message': 'This is a protected route to get saved plants info for a user'})


@views.route("/addPlantDetailsIndb", methods=['POST'])
# @token_required
def insert_plant_detail_to_db():
    return jsonify({'message': 'This is a protected route for saving plant details in db'})

@views.route("/searchPlantsDetails", methods=['POST'])
# @token_required
def search_plants_detail():
    return jsonify({'message': 'This is a protected route for searching'})

@views.route("/deletePlantsDetails", methods=['DELETE'])
# @token_required
def delete_plants_detail():
    return jsonify({'message': 'This is a protected route for deleting a plant'})


