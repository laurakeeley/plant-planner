from flask import Blueprint, render_template, request, flash, jsonify, current_app
from flask_login import login_required, current_user
from sqlalchemy.exc import SQLAlchemyError
from ..models import Plant, User, UserPlants
from .. import db

from flask import Flask, request, jsonify
# from server import create_app

from .auth import token_required

#! initialize blueprint, always need to pass in __name__, and the name of the blueprint
views = Blueprint("views", __name__)

@views.route("/getPlants", methods=['GET'])
@token_required
def profile():
    if request.method == "GET":
        try:
            data = request.json
            user_id = data.get('user_id')
            
            #*validate data type
            if not isinstance(user_id, int):
                return jsonify({'error': 'user id must be an int'}), 400
            
            #*query user table to get user info
            user_info = User.query.filter_by(id = user_id).first()
            if user_info is None:
                return jsonify({'error': 'User record not found'}), 404
            
            #* convert SQLAlchemy object into JSON to pass to FE
            user_data = {
                'email': user_info.email,
                "first_name": user_info.first_name,
                "last_name": user_info.last_name
            }
         
            
            #*query user_plant to get all the plant ids
            favorite_plant_ids = set()
            all_plants_ids = UserPlants.query.filter_by(user_id=user_id).all()

            for plant in all_plants_ids:
                plant_id = plant.plant_id
                if isinstance(plant_id, int):
                    favorite_plant_ids.add(plant_id)
            #*query plant details for the plant id
                _all_plants_detail_list = _get_all_plants_by_ids(plant_ids_list=favorite_plant_ids)
            return jsonify({'user_record': user_data, 'plants_record': _all_plants_detail_list}), 200
        except: 
            return jsonify({'message': 'Failed to get user or their plants info'})

def _get_all_plants_by_ids(plant_ids_list: set) -> list:
    all_plants_detail_list = list()
    if isinstance(plant_ids_list, set):
        for plant_id in plant_ids_list:
            plant_details = Plant.query.filter_by(plant_id=plant_id).first()
            
            plant_data = {
                'plant_id': plant_details.plant_id,
                'plant_name': plant_details.plant_name,
                'details': plant_details.details
            }
            all_plants_detail_list.append(plant_data)
        return all_plants_detail_list
    else:
        return jsonify({'message': 'Failed to get plants info for current user'}), 400

@views.route("/addPlantDetailsIndb", methods=['POST'])
@token_required
def insert_plant_detail_in_db():
    if request.method == "POST":
        try:
            data = request.json
            #*get plant_id, plant_name and details 
            plant_id = data.get('plant_id')            
            plant_name = data.get('plant_name')
            details = data.get("details")
            
            #*validate data type
            if not isinstance(plant_id, int):
                return jsonify({'error': 'plant_id must be an int'}), 400
            if not isinstance(plant_name, str):
                return jsonify({'error': 'plant_name must be a string'}), 400
            if not isinstance(details, dict):
                return jsonify({'error': 'details must be a dictionary'}), 400
            
            #*check to see if the record is existed
            plant_detail_lookup = Plant.query.filter_by(plant_id=plant_id).first()
            if plant_detail_lookup:
                return jsonify({'error': 'Failed to create a new plant reocrd because the plant exists in db alreay'}), 400
            
            #* if no data exists yet, store in the plant db
            new_plant_detail_record = Plant(plant_id=plant_id, plant_name=plant_name, details=details)
            db.session.add(new_plant_detail_record)
            db.session.commit()
 
            return jsonify({'message': 'New plant detail record is inserted into Plant db successfully', 'status':200}),200
        except Exception:
            return jsonify({"message": "Failed to insert plant detail into db", "status":400}),400
        
        
@views.route("/searchPlantsDetails", methods=['GET'])
@token_required
def search_plants_detail():
    if request.method == "GET":
        try:
            data = request.json
            plant_id = data.get("plant_id")
            if not isinstance(plant_id, int):
                return jsonify({'error': 'plant_id must be an int'}), 400
            plant_record = Plant.query.filter_by(plant_id=plant_id).first()

            if plant_record is None:
                return jsonify({'error': 'Plant record not found'}), 404
            
            #* convert SQLAlchemy object into JSON to pass to FE
            plant_data = {
                'plant_id': plant_record.plant_id,
                'plant_name': plant_record.plant_name,
                'details': plant_record.details
            }
            return jsonify({'record': plant_data}), 200
        
        except SQLAlchemyError as e:
            return jsonify({'error': f'Database Error. Failed to get plant record from db because of {str(e)}'}), 500
        except Exception as e:
            return jsonify({'error': str(e)}), 500

@views.route("/deletePlantsDetails", methods=['DELETE'])
@token_required
def delete_plants_detail():
    return jsonify({'message': 'This is a protected route for deleting a plant'})


@views.route("/addPlantToProfile", methods=['POST'])
@token_required
def add_a_plant_in_profile():
    if request.method == "POST":
        try:
        #*get user id and plant id
            data = request.json
            user_id = data.get("user_id")
            plant_id = data.get("plant_id")  
        #*validate user id and plant id and both exist
            if not isinstance(user_id, int):
                return jsonify({'error': 'user_id must be an int'}), 400
            _validate_plant_id(plant_id)
            
        #*write to user_plants
            add_a_plant_in_profile = UserPlants(plant_id=plant_id, user_id=user_id)
            db.session.add(add_a_plant_in_profile)
            db.session.commit()
        
            return jsonify({'message': 'Add a plant in profile for the current user successfully', 'status':200}),200
        except:
            return jsonify({'error': "Failed to add a plant in profile for the current user"}), 400
        
        
        
def _validate_plant_id(plant_id: int) -> int:
    if isinstance(plant_id, int):
        plant_record_lookup = Plant.query.filter_by(plant_id=plant_id).first()
        if not plant_record_lookup:
            return jsonify({'error': 'Plant does not exist'}), 400
        return plant_id
    else:
        return jsonify({'error': 'plant_id must be an int'}), 400