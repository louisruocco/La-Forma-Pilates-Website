const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({path: "../.env"});

const db = mongoose.connect(process.env.DB_URI, () => console.log("Contact Schema Connected..."));

const contactSchema = new mongoose.Schema({
    name: String, 
    surname: String, 
    email: String, 
    number: Number, 
    enquiry: String
});

const contact = mongoose.model("contact", contactSchema);
module.exports = contact;