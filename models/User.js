const mongoose = require("mongoose");


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
    }

   
},{timestamps:true}); 
module.exports = mongoose.model("User", schema);


