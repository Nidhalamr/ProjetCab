import mongoose from "mongoose";

const schema = new mongoose.Schema({
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
    }
},{timestamps:true}); 

const Patient = mongoose.model("Patient", schema);


export default Patient;


