
import Product from "../models/product.js";


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

