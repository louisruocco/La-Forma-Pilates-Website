const express = require("express");
const session = require("express-session");
const dotenv = require("dotenv");
const path = require("path");
const router = express.Router();

dotenv.config({path: "./.env"});

const redirectLogin = (req, res, next) => {
    if(!req.session.userId){
        return res.redirect("/admin")
    } else {
        next();
    }
}

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/static/index.html"))
});

router.get("/admin", (req, res) => {
    const { userId } = req.session;
    res.sendFile(path.join(__dirname, "../public/static/admin.html"))
});

router.get("/admin/dashboard", redirectLogin, (req, res) => {
    res.render("home");
});

router.get("/admin/dashboard/add-client", redirectLogin, (req, res) => {
    res.sendFile(path.join(__dirname, "../public/static/add-client.html"));
});

module.exports = router;