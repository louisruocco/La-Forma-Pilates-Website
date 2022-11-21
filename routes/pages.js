const express = require("express");
const session = require("express-session");
const clients = require("../db/clients");
const invoices = require("../db/invoice");
const dotenv = require("dotenv");
const path = require("path");
const users = require("../db/users");
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
    res.render("index", {message: req.flash("success")});
});

router.get("/admin", (req, res) => {
    const { userId } = req.session;
    res.render("admin", {message: req.flash("error")});
});

router.get("/admin/dashboard", redirectLogin, async (req, res) => {
    const findClients = await clients.find({user: req.session.userId});
    res.render("home", {findClients, message: req.flash("success")});
});

router.get("/admin/dashboard/add-client", redirectLogin, (req, res) => {
    res.sendFile(path.join(__dirname, "../public/static/add-client.html"));
});

router.get("/admin/client/:name/:surname", redirectLogin, async (req, res) => {
    const person = await clients.find({name: req.params.name, surname: req.params.surname})
    const history = await invoices.find({name: req.params.name, surname: req.params.surname})
    res.render("client", {person, history, message: req.flash("success")});
});

router.get("/admin/client/:name/:surname/edit-client", redirectLogin, async (req, res) => {
    const client = await clients.find({name: req.params.name, surname: req.params.surname});
    res.render("edit-client", {client});
})

router.get("/admin/client/:name/:surname/add-invoice", redirectLogin, async (req, res) => {
    const person = await clients.find({name: req.params.name, surname: req.params.surname})
    res.render("invoice", {person});
});

router.get("/admin/client/:name/:surname/:id/edit-invoice", redirectLogin, async (req, res) => {
    const invoice = await invoices.find({_id: req.params.id});
    res.render("edit-invoice", {invoice});
});

router.get("/:id/delete-client", redirectLogin, async (req, res) => {
    const client = await clients.find({_id: req.params.id})
    res.render("delete-client", {client});
})

router.get("/admin/admin-dashboard", redirectLogin, async (req, res) => {
    const members = await users.find({})
    res.render("admin-home", {members})
});

router.get("/admin/user/:id", async (req, res) => {
    const user = await users.findOne({_id: req.params.id});
    res.render("user", {user});
});

router.get("/admin/add-user", redirectLogin, (req, res) => {
    res.sendFile(path.join(__dirname, "../public/static/add-user.html"));
});

router.get("/admin/user/:id/change-password", async (req, res) => {
    const user = await users.findOne({_id: req.params.id});
    res.render("change-password", {user});
});

router.get("/privacy-policy", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/static/privacy-policy.html"));
})

module.exports = router;