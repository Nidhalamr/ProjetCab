const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    Medecin:{
        type: mongoose.Schema.ObjectId, 
        ref: 'Medecin',
        required:true
    },
    idPatient:{
        type:String,
        required:true
    },
    contenu:{
        type:{nom:String,prenom:String,diagnostic:String},
        required:true
    },
    typeImagerie:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model("Rapport", schema);
