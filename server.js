const express=require("express");
const connectDB=require("./config/connectDB");
const app=express();
const mongoose=require("mongoose");

// const patientController=require("./contoller/patientc")
// const patient= require ('./routes/patient')
const patientR= require('./routes/patientR');
const rapportR= require('./routes/rapportR');
const userR= require('./routes/userR');
const bodyParser = require("body-parser");


app.use(express.json());
app.use("/patient",patientR);
app.use("/rapport",rapportR);
app.use("/user",userR);


app.use("/",(req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,PATCH,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "*");
    next();
})

connectDB()




app.get("/", (req,res)=>{
res.send("E nemer ena");

});

//run server
const port=3001
app.listen(port,(err)=>{
    err?console.log(err):console.log(`server is running on port ${port}`)
});