import express from "express";

const router=express.Router()
import patientController from "../contoller/patientc.js"
import verifyToken from "../middleware/authentification.js"



router.post("/create",verifyToken.verifyTokenAny,patientController.createPatient);
router.get("/find",verifyToken.verifyTokenAny,patientController.findPatients);
router.get("/find/:id",verifyToken.verifyTokenAny,patientController.findPatient);
router.patch("/update/:id",verifyToken.verifyTokenAny,patientController.updatePatient);
router.delete("/delete/:id",verifyToken.verifyTokenAny,patientController.deletePatient);

router.get("/search/query",patientController.querrySearchUser)

export default router