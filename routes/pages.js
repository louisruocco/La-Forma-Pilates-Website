const express = require("express");
const session = require("express-session");
const dotenv = require("dotenv");
const path = require("path");
const router = express.Router();

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/static/index.html"))
});

router.get("/admin", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/static/admin.html"))
});

module.exports = router;