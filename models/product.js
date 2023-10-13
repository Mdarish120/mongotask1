import mongoose from "mongoose";

// Define the schema for the product
const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description:{
        type: String,
        required: true,
    }
});

// Create a Product model based on the schema
const Product = mongoose.model('Product', productSchema);

export default Product;
