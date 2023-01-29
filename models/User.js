const mongoose = require("mongoose");


// const isM =(schema)=>{
//     schema.isMedecin ? {...schema,medecinId:{type:String}}:{...schema}
// }




const schema = new mongoose.Schema({

    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
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
   
}); 
// const schema=isM(Schemauser)
module.exports = mongoose.model("User", schema);


