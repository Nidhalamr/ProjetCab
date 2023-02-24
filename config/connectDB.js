import mongoose from "mongoose"
import config from "config"

const connectDB=()=>{
    
    mongoose.connect(config.get("MONGO_URI"))
    .then(()=>console.log("mongoose connected"))
    .catch((err)=>console.log(err));
};

export default connectDB;