import jwt from "jsonwebtoken";

const secret="awesome";

const auth = async (req, res, next) => {
   try {
         
     let token = req.headers.authorization.split(" ")[1];
     let isCustomAuth = token.length < 500;
 
     let decodedData;
 
     if (token && isCustomAuth) {      
       decodedData = jwt.verify(token, secret);
 
       req.userId = decodedData?.id;
     } else {
       decodedData = jwt.decode(token);
 
       req.userId = decodedData?.sub;
     }    
 
     next();
   } catch (error) {
     console.log(error);
     res.status(400).json({message:"invalid request..."})
   }
 };
 
 export default auth;