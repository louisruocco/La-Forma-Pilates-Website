const express = require("express");
const session = require("express-session");
const users = require("../db/users");
const clients = require("../db/clients");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const invoices = require("../db/invoice");
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
});

router.post("/add-client", async (req, res) => {
    const { name, surname, street, postcode } = req.body;
    const client = await clients.find({
        $and: [
            {name: name}, 
            {surname: surname}
        ]
    })

    if(client.length > 0){
        return res.send("Client already Exists");
    } else {
        await clients.create({
            name: name, 
            surname: surname, 
            address: {
                street: street, 
                postcode: postcode
            }
        })

        res.redirect("back");
      }
});

router.post("/admin/client/:name/:surname/add-invoice", async (req, res) => {
    const { date, time, amount, status } = req.body;
    await invoices.create({
        name: req.params.name, 
        surname: req.params.surname, 
        date: date, 
        time: time,
        amount: amount,
        status: status
    });

    res.redirect(`/admin/client/${req.params.name}/${req.params.surname}`);
});

router.post("/admin/client/:name/:surname/edit-invoice", (req, res) => {
    console.log("changes saved...");
})

router.post("/:name/:surname/:id/delete-invoice", async (req, res) => {
    await invoices.deleteOne({id: req.params.id})
    res.redirect("back");
})

module.exports = router;