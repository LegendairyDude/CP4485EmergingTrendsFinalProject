from flask import Flask, jsonify, request
##use cors to make request from the next.js react server to the python api
##avoids cross-origin issues to route end points
from flask_cors import CORS
##import random for testing an dev purpose till final langchain imp
import random
from langChain_nameGen import create_pet_name

## app instance 
app = Flask(__name__)
CORS(app) ##apply cors to the flask app

########################
#Test pet names       ##
########################
pet_names = ["Poe", "Luna", "Chase", "Spot", "Greg", "Geoff", "Jeff", "Princess Anne-Belle the Second", "Jesus, The Lord and Savior", "Reggie P", "Fluffy", "Gimmick", "Peach", "Daisy", "Ms Sunflower", "Butter Biscuit"]
#############################################

######################
##home route?     ###
####################
@app.route("/")
def hello():
    return jsonify(message='Hello from Flask def_hello')

###########################################################################
##  Generator Route                                                      ##
##  to be hooked to langchain and use LLM to generate input              ##
##  Input to be based of user input                                      ##
###########################################################################
@app.route('/generate', methods=['GET'])
def get_pet_description():
    name = random.choice(pet_names)
    return jsonify(name=name)

@app.route('/profile', methods=['GET'])
def profile():
    return jsonify(pet_names)

@app.route("/generate_pet_name", methods=['POST'])
def generate_pet_name():
    data = request.json ## Assuming data is sent as JSON
    pet_type = data.get('petType')
    pet_description = data.get('petDescription')

    generated_name = create_pet_name(pet_type, pet_description)

    return jsonify({'generatedName' : generated_name})



if __name__ == "__main__":
    app.run(debug=True, port=8080)  #change from port 5000 ; conflict with cors and request form front end