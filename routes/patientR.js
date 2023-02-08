const express = require('express')
const router=express.Router()
const patientController=require("../contoller/patientc")
const verifyToken=require("../middleware/authentification")



router.post("/create",verifyToken.verifyTokenAny,patientController.createPatient);
router.get("/find",verifyToken.verifyTokenAny,patientController.findPatients);
router.get("/find/:id",verifyToken.verifyTokenAny,patientController.findPatient);
router.patch("/update/:id",verifyToken.verifyTokenAny,patientController.updatePatient);
router.delete("/delete/:id",verifyToken.verifyTokenAny,patientController.deletePatient);

router.get("/search/query",patientController.querrySearchUser)

module.exports = router