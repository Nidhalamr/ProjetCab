import express from "express";

const router=express.Router()
import patientController from "../contoller/patientc.js"
import verifyToken from "../middleware/authentification.js"
import auth from "../middleware/auth.js"

router.delete("/delete/:id",verifyToken.verifyTokenAny,patientController.deleteUser);
router.post("/login",auth.login);
router.patch("/update/:id",verifyToken.verifyTokenAny,verifyToken.verifyPassword,patientController.updateUser);
router.get("/:id",verifyToken.verifyTokenAny,patientController.getUser);



export default router