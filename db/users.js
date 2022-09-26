const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({path: "./.env"});

const db = mongoose.connect(process.env.DB_URI, () => {
    console.log("User Schema Connected...");
})

const userSchema = new mongoose.Schema({
    name: String, 
    password: String
});

const users = mongoose.model("users", userSchema);
module.exports = users;