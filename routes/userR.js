const express = require('express')
const auth= require('../middleware/auth')
const router=express.Router()
const patientController=require("../contoller/patientc")
const verifyToken=require("../middleware/authentification")

router.delete("/delete/:id",verifyToken.verifyTokenAny,patientController.deleteUser);
router.post("/create",auth.register);
router.post("/login",auth.login);
router.patch("/update/:id",verifyToken.verifyTokenAny,patientController.updateUser);
router.get("/:id",verifyToken.verifyTokenAny,patientController.getUser);



module.exports = router