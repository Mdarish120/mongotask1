
import Product from "../models/product.js";
import User from "../models/user.js";
import Order from "../models/order.js"

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


export const deleteCartItem= async (req,res)=>{
   
    const {userId,cartItemId }=req.params;

    try {


        const user=await User.findById({_id:userId});

        console.log(user)

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const cartItemIndex = user.cart.findIndex((item) => item._id.equals(cartItemId));

          console.log(cartItemIndex)
        if (cartItemIndex === -1) {
            return res.status(404).json({ message: 'Cart item not found' });
        }

        user.cart.splice(cartItemId,1);

        const updatedUser = await user.save();

        res.status(200).json(updatedUser);

        
    } catch (error) {
        
        console.log(error);

    }
}


export const moveCartToOrders = async (req, res) => {
    try {

        console.log("order_controller....")
        const {userId} = req.params;

        console.log(userId)

        // Find the user by their ID
        const user = await User.findById({_id:userId}).populate('cart.product');
        console.log(user.cart)

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.cart.length === 0) {
            return res.status(400).json({ message: 'The cart is empty' });
        }

      
        //Create a new order with items from the cart
        const newOrder = new Order({
            user: userId,
            items: user.cart,
        });

         //Save the new order to the Orders table
        await newOrder.save();

        // Clear the user's cart
        user.cart = [];

        // Save the updated user (empty cart)
        await user.save();

        res.status(200).json({ message: 'Cart items moved to Orders and cart is now empty' });
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error)
    }
};


export const getAllOrders = async (req, res) => {
    try {
        const userId = req.params.userId;

        // Find all orders that belong to the user
        const orders = await Order.find({ user: userId }).populate('items.product');

        // Log the orders (in this example, we're using console.log)
        console.log('Orders for user', userId, ':', orders);

        // You can send the orders as a response if needed
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};