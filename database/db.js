const mongoose = require("mongoose");
const dotenv = require("dotenv");


async function connectDB () {
    dotenv.config({path:"./config/config.env"});
    const db = process.env.DB;
    try{
        if(db){
            await mongoose.connect(db);
            console.log("Connected to database successfully");
        }
    } catch(err){
        console.log(err);
    }
}

module.exports = connectDB;