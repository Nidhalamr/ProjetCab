import jwt from "jsonwebtoken"
import bcrypt  from 'bcrypt';
import User  from "../models/User.js";



const verifyTokenMed= async (req,res, next)=>{
try{
    let token = req.header("Authorization")
    if(!token){
        return res.status(403).send("Vous ne pouvez pas faire ça")

    }
    if(token.startsWith("Bearer ")){
        token= token.slice(7,token.length).trimleft()
    }
    const verified =jwt.verify(token,"mallaprojet")
    req.user=verified
    if (verified.theId.length!=8){
        return res.status(403).send("Vous ne pouvez pas faire ça")
    }
    next();
}catch (err){
    res.status(500).json({error: err.message})



}

}

const verifyTokenAny= async (req,res, next)=>{
    try{
        let token = req.header("Authorization")
        if(!token){
            return res.status(403).send("Vous ne pouvez pas faire ça")
    
        }
        if(token.startsWith("Bearer ")){
            token= token.slice(7,token.length).trimleft()
        }
        const verified =jwt.verify(token,"mallaprojet")

        req.user=verified
        console.log(req.user)
        next();
    }catch (err){
        res.status(500).json({error: err.message})
    
    
    
    }
    
    }


    const verifyPassword= async (req,res, next)=>{
        try{
            let token = req.header("Authorization")
            const {_id,password}=req.body;
            if(!token||!password||!_id){
                return res.status(403).send("Vous ne pouvez pas faire ça")
        
            }
            const user = await User.findById(req.body._id)
            if (!user){
            return res.status(400).json({msg: "Ce compte n'existe pas"})
            }
            const isMatch= await bcrypt.compare(password,user.password);
            if (!isMatch){
            return res.status(400).json({msg:"Mot de passe incorrect"}); 
            }


            if(token.startsWith("Bearer ")){
                token= token.slice(7,token.length).trimleft()
            }
            const verified =jwt.verify(token,"mallaprojet")
    
            req.user=verified

            
            delete user.password;

            next();
        }catch (err){
            res.status(500).json({error: err.message})
        
        
        
        }
        
        }




export default {verifyTokenMed,verifyTokenAny,verifyPassword}