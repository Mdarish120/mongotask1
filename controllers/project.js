
import Product from "../models/product.js";
import User from "../models/user.js";

export const createProduct= async(req,res)=>{
  
    const {price ,title,description}=req.body;

    try {

        const result=await Product.create({title,price,description});
        res.status(201).json(result);
        
    } catch (error) {
        
        console.log(error)
    }
}


export const updateProduct= async(req,res)=>{

    const {price ,title,description}=req.body;

    try {
       const result =await Product.updateOne({title,price,description});
       res.status(200).json(result)
    } catch (error) {
        console.log(error)
    }
}

export const deleteProduct= async(req,res)=>{

const {id }= req.params;

    try {
       const result =await Product.deleteOne({_id:id});
       res.status(200).json(result)
    } catch (error) {
        console.log(error)
    }
}


//Add a product to the user's cart

export const addToCart = async (req, res) => {
    try {
        const {userId,productId} = req.params;
 

        // Find the user and the product by their IDs
        const user = await User.findById({_id:userId});
        const product = await Product.findById({_id:productId});

        console.log(user);
        console.log(product)

        if (!user || !product) {
            return res.status(404).json({ message: 'User or product not found' });
        }

        // Check if the product is already in the cart
        const existingCartItem = user.cart.find((item) => item.product.equals(productId));

        if (existingCartItem) {
            // If the same product is found, increase the quantity
            existingCartItem.quantity += 1;
        } else {
            // If a different product is added, create a new cart item
            user.cart.push({ product: productId, quantity: 1 });
        }

        // Save the updated user with the new cart item
        const updatedUser = await user.save();

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
