import mongoose from "mongoose";


// const isM =(schema)=>{
//     schema.isMedecin ? {...schema,medecinId:{type:String}}:{...schema}
// }




const schema = new mongoose.Schema({

    theId:{
        type:String,
        unique:true
    },
    password:{
        type:String,
        required:true,
        min:5
        
    },
    nom:{
        type:String,
        required:true
    },
    prenom:{
        type:String,
        required:true
    },
    dateDeNaissance:{
        type:String,
        required:true
    },
    genre:{
        type:String,
        required:true
    },
    isMedecin:{
        type:Boolean,
        default:false
    },
    picturePath:{
        type:String,
        
    }

   
},{timestamps:true}); 

const User = mongoose.model("User", schema);


export default User;


