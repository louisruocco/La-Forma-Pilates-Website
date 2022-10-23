const express = require("express");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const mongoose = require("mongoose");
const ejs = require("ejs");
const dotenv = require("dotenv");
const flash = require("connect-flash");
const users = require("./db/users");
const clients = require("./db/clients");
const invoices = require("./db/invoice");
const app = express();

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening at ${port}`));

dotenv.config({path: "./.env"});

const sessionStore = new MongoDBStore({
    uri: process.env.DB_URI, 
    collection: process.env.DB_COLLECTION
})

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static("public"));
app.use("/css", express.static("/public/css"));
app.use("/js", express.static("/public/js"));
app.use("/images", express.static("/public/images"));
app.use(flash());
app.set("view engine", "ejs");
app.use(session({
    name: process.env.SESS_NAME, 
    secret: process.env.SECRET, 
    resave: false, 
    store: sessionStore,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 1
    }
}));

app.use("/", require("./routes/pages"));
app.use("/auth", require("./routes/auth"));