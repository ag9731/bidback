const app = require("./app");
const dotenv = require("dotenv");
const connectDB = require("./database/db");

dotenv.config({ path: './config/config.env' });

const port = process.env.PORT || 5000;

console.log(port);

connectDB();

app.listen(port,()=>{
    console.log(`Connected`);
})