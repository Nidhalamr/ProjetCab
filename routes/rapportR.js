import express from "express";

const router=express.Router()
import patientController from "../contoller/patientc.js"
import verifyToken from "../middleware/authentification.js"



router.post("/create",verifyToken.verifyTokenMed,patientController.createRapport);
router.get("/find/:id",verifyToken.verifyTokenMed,patientController.findRapports);
router.get("/find/:id",verifyToken.verifyTokenMed,patientController.findRapport);
router.patch("/update/:id",verifyToken.verifyTokenAny,patientController.updateRapport);
router.delete("/delete/:id",verifyToken.verifyTokenMed,patientController.deleteRapport);


export default router