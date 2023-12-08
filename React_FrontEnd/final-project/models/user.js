// template for new user after sign up in db
//want to link to corresponded with entries to the name generator for loggin and display on profile page 
import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, "Email already exists"],
        required: [true, 'Email is required']
    },
    username: {
        type: String,
        required: [true, "Username is required"]
    },
    image: {
        type: String,
    }
})

const User = models.User || model("User", UserSchema)

export default User