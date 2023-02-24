import User from "../models/User.js";
import jwt  from 'jsonwebtoken';
import bcrypt  from 'bcrypt';
import {uuid} from 'uuidv4';

const register = async (req, res) => {
  try {
    let random=uuid()
    let login= {theId:random}
console.log(random,"ran")
    const{
  nom,
  prenom,
  password,
  dateDeNaissance,
  genre,
  isMedecin,
  picturePath
    }=req.body
    console.log(isMedecin)
    if (isMedecin){
    login={theId:random.split("-")[0]}

    }else{
    login={theId:random.split("-")[0].slice(2)}
    }
    const salt = await bcrypt.genSalt();
    const passwordHash= await bcrypt.hash(password,salt)

    let newUser = new User({
  nom,
  prenom,
  password:passwordHash,
  dateDeNaissance,
  genre,
  isMedecin,
  picturePath,

    
    

    });
  
  newUser=Object.assign(newUser,login)





  
    const savedUser=await newUser.save();
    res.status(201).json(savedUser);

  } catch (err){

    res.status(500).json({ error: err.message})



  }

}


const login = async (req,res) => {
try {
  const {theId,password}=req.body;
  const user = await User.findOne({theId:theId})
  if (!user){
  return res.status(400).json({msg: "Ce compte n'existe pas"})
  }
  const isMatch= await bcrypt.compare(password,user.password);
  if (!isMatch){
  return res.status(400).json({msg:"Mot de passe incorrect"}); 
  }


  let token =jwt.sign({theId:req.body.theId},"mallaprojet")

  delete user.password;
  res.status(200).json({token,user})
    

  } catch(err){
    res.status(500).json({error:err.message})


  }


}






export default {register,login}