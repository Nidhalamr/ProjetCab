const express = require('express')

const router=express.Router()
const patientController=require("../contoller/patientc")
const verifyToken=require("../middleware/authentification")




router.post("/create",verifyToken.verifyTokenMed,patientController.createRapport);
router.get("/find",verifyToken.verifyTokenAny,patientController.findRapport);
router.get("/find/:id",verifyToken.verifyTokenAny,patientController.findRapport);
router.patch("/update/:id",verifyToken.verifyTokenAny,patientController.updateRapport);
router.delete("/delete/:id",verifyToken.verifyTokenMed,patientController.deleteRapport);


module.exports = router