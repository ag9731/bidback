const app = require("./app");
const dotenv = require("dotenv");
const connectDB = require("./database/db");
const cloudinary = require("cloudinary").v2;

dotenv.config({ path: './config/config.env' });

const port = process.env.PORT || 5000;

console.log(port);

connectDB();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.listen(port,()=>{
    console.log(`Connected`);
})