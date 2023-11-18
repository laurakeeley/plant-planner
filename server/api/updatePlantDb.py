from sqlalchemy import func
from ..models import Plant
from .. import db

def update_plant_names():
    """
    Function used to update existing plant name in the Plant table
    To invoke the function, place this code below under main.py before app.run(debug=True):
        # with app.app_context():
        # update_plant_names()
        # update_common_name_in_details_field()
    """
    plants = Plant.query.all()
    for plant in plants:
        capitalized_plant_name = plant.plant_name.title()
        plant.plant_name = capitalized_plant_name 
        db.session.commit()
    

def update_common_name_in_details_field():
    """
    Function used to update existing common name in the details field in the Plant table
    To invoke the function, place this code below under main.py before app.run(debug=True):
        # with app.app_context():
        # update_plant_names()
        # update_common_name_in_details_field()
    """
    plants = Plant.query.all()
    for plant in plants:
        detail = plant.details
        if 'common_name' in detail:
            common_name = detail['common_name'].title()
            print(common_name)
            detail['common_name'] = common_name
            Plant.query.filter_by(plant_name=common_name).update({'details': detail})
            
            db.session.commit()
        
        
        