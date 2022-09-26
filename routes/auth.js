const express = require("express");
const session = require("express-session");
const users = require("../db/users");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const router = express.Router();

dotenv.config({path: "./.env"});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await users.findOne({name: username});

    if(user[0] === undefined){
        return res.send("User Not Found");
    }

    const bcryptCompare = await bcrypt.compare(password, user[0].password);

    if(!user || !bcryptCompare){
        return res.send("User Not found");
    } else {
        res.send("Home Page");
    }
    
})

module.exports = router;