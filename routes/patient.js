const express = require('express')

const patient=express.Router()
const patientController=require("../contoller/patientc")
//Create and Save a Record of a Model:


patient.post("/create",patientController.createPatient);
patient.post("/find",patientController.findPatients);
patient.post("/findid",patientController.findPatient);
patient.post("/update",patientController.updatePatient);
patient.post("/delete",patientController.deletePatient);



  
    module.exports = patient;

