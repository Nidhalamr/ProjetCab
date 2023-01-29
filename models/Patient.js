const mongoose = require("mongoose");

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
    // rapport:[{medecin:String,rapport:String}]
})

module.exports = mongoose.model("Patient", schema);


