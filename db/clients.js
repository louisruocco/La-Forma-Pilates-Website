const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({path: "./.env"});

const db = mongoose.connect(process.env.DB_URI, () => {
    console.log("Client Schema Connected...");
})

const clientSchema = new mongoose.Schema({
    user: String,
    name: String, 
    surname: String, 
    address: {
        street: String, 
        postcode: String
    }
});

const clients = mongoose.model("clients", clientSchema);
module.exports = clients;