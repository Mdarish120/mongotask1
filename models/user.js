import mongoose from "mongoose";

// Define the schema for the product
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
   
});

// Create a user model based on the schema
const User = mongoose.model('User', userSchema);

export default User;
