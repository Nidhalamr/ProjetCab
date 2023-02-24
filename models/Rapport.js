import mongoose from "mongoose";

const schema = new mongoose.Schema({
    MedecinId:{
        type: String, 

        required:true
    },
    idPatient:{
        type:String,
        required:true
    },
    contenu:{
        type:String,
        required:true
    },
    typeImagerie:{
        type:String,
    },
    nomPrenom:{
        type:String,
        required:true
    },
    publicationDate:{
        type:String,
        required:true
    }
    
},{timestamps:true}); 

const Rapport = mongoose.model("Rapport", schema);


export default Rapport;
