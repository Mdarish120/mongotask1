import User from "../models/user.js";

export const createUser=async(req,res)=>{
  
    const {name}=req.body;

    try {
         const result=await User.create({name});
         res.status(201).json(result);
    } catch (error) {

        console.log(error.message);
        
    }
}


export const getUser=async(req,res)=>{
  
    const {id}=req.params;

    try {
         const result=await User.findById({_id:id});
         res.status(201).json(result);
    } catch (error) {

        console.log(error.message);
        
    }
}