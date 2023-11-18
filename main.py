from server import create_app
import jwt

from server.api.updatePlantDb import update_plant_names, update_common_name_in_details_field

app = create_app()

if __name__ == '__main__':
    app.run(debug=True)