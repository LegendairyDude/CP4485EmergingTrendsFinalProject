/* Model/Template for MongoDb Schema via mongoose*/
import { Schema, model, models } from "mongoose";

//needs modification for registering usr now that auth is fully set up
// New prompt Schema sans userauth 
const PromptSchema = new Schema({
    petType: {
        type: String,
        required: true,
    },
    petDescription: {
        type: String,
        required: true,
    },
    generatedName: {
        type: String,
        required: true,
    },
    
})

//check if prompt model exists and create accordingly 
const Prompt = models.Prompt || model('Prompt', PromptSchema)

export default Prompt