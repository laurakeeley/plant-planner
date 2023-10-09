from flask import Blueprint, render_template, request, flash, jsonify
from flask_login import login_required, current_user
from ..models import Plant
from .. import db

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
def insert_plant_detail_in_db():
    if request.method == "POST":
        try:
            #use the plant id to fetch api
            data = request.json
            #get plant_id, plant_name and details 
            plant_id = data.get('plant_id')            
            plant_name = data.get('plant_name')
            details = data.get("details")
            #store in the plant db
            new_plant_detail_record = Plant(plant_id=plant_id, plant_name=plant_name, details=details)
            db.session.add(new_plant_detail_record)
            db.session.commit()
            #return a response either db insert successfully or err message
            return jsonify({'message': 'New plant detail record is inserted into Plant db successfully', 'status':200}),200
        except Exception:
            return jsonify({"message": "Failed to insert plant detail into db", "status":400}),400
@views.route("/searchPlantsDetails", methods=['POST'])
# @token_required
def search_plants_detail():
    return jsonify({'message': 'This is a protected route for searching'})

@views.route("/deletePlantsDetails", methods=['DELETE'])
# @token_required
def delete_plants_detail():
    return jsonify({'message': 'This is a protected route for deleting a plant'})


