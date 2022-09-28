const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({path: "./.env"});

const db = mongoose.connect(process.env.DB_URI, () => {
    console.log("Invoice Schema Connected...");
})

const invoiceSchema = new mongoose.Schema({
    name: String, 
    surname: String, 
    date: String,
    time: Number, 
    amount: Number,
    status: String
});

const invoices = mongoose.model("invoice", invoiceSchema);
module.exports = invoices;