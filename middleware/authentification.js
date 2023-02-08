const jwt=require("jsonwebtoken")
const { restart } = require("nodemon")


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




module.exports={verifyTokenMed,verifyTokenAny}