

import connectDB from "./config/connectDB.js";

import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import multer from "multer";
import auth from "./middleware/auth.js"
import path from "path";
import { fileURLToPath } from "url";
import patientR from "./routes/patientR.js";
import rapportR from "./routes/rapportR.js";
import userR from "./routes/userR.js";



const app=express();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.json());
app.use("/patient",patientR);
app.use("/rapport",rapportR);
app.use("/user",userR);
app.use("/assets", express.static(path.join(__dirname, "public/assets")));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
  const upload = multer({ storage });
  




app.post("/user/create", upload.single("picture"),auth.register);

connectDB()


app.get("/", (req,res)=>{
res.send("E nemer ena");



});


const port=3001
app.listen(port,(err)=>{
    err?console.log(err):console.log(`server is running on port ${port}`)
});