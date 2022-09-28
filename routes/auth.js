const express = require("express");
const session = require("express-session");
const users = require("../db/users");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const router = express.Router();

dotenv.config({path: "./.env"});

const redirectHome = (req, res, next) => {
    if(req.session.userId){
        return res.redirect("/admin/dashboard");
    } else {
        next();
    }
}

router.post("/login",redirectHome, async (req, res) => {
    const { username, password } = req.body;
    const user = await users.find({name: username});

    if(user[0] === undefined){
        return res.send("User Not Found");
    }

    const bcryptCompare = await bcrypt.compare(password, user[0].password);

    if(!user || !bcryptCompare){
        return res.send("User Not found");
    } else {
        req.session.userId = user[0].id;
        res.redirect("/admin/dashboard");
    }
});

router.post("/logout", (req, res) => {
    req.session.destroy((err) => {
        if(err){
            return res.redirect("/home");
        } else {
            res.clearCookie(process.env.SESS_NAME);
            res.redirect("/");
        }
    })
})

module.exports = router;