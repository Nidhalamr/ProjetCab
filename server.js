const express=require("express")
const connectDB=require("./config/connectDB")
const app=express()
const mongoose=require("mongoose")
const patientController=require("./contoller/patientc")



app.use(express.json())


connectDB()


app.post("/patient/create",patientController.createPatient);
app.get("/patient/find",patientController.findPatients);
app.get("/patient/find/:id",patientController.findPatient);
app.patch("/patient/update/:id",patientController.updatePatient);
app.delete("/patient/delete/:id",patientController.deletePatient);

app.delete("/user/delete/:id",patientController.deleteUser);
app.post("/user/create",patientController.createUser);
app.patch("/user/update/:id",patientController.updateUser);

app.post("/rapport/create",patientController.createRapport);
app.get("/rapport/find",patientController.findRapports);
app.get("/rapport/find/:id",patientController.findRapport);
app.patch("/rapport/update/:id",patientController.updateRapport);
app.delete("/rapport/delete/:id",patientController.deleteRapport);



app.get("/", (req,res)=>{
res.send("E nemer ena");

});

//run server
const port=5000
app.listen(port,(err)=>{
    err?console.log(err):console.log(`server is running on port ${port}`)
});