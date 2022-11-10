const express = require("express");
const session = require("express-session");
const users = require("../db/users");
const clients = require("../db/clients");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const invoices = require("../db/invoice");
const nodemailer = require("nodemailer");
const router = express.Router();

dotenv.config({path: "./.env"});

const redirectHome = (req, res, next) => {
    if(req.session.userId){
        return res.redirect("/admin/dashboard");
    } else {
        next();
    }
}

const redirectLogin = (req, res, next) => {
    if(!req.session.userId){
        return res.redirect("/admin")
    } else {
        next();
    }
}

router.post("/login", redirectHome, async (req, res) => {
    const { username, password } = req.body;
    const user = await users.find({name: username});

    if(user[0] === undefined){
        req.flash("error", "User Not Found");
        return res.redirect("back");
    }

    const bcryptCompare = await bcrypt.compare(password, user[0].password);

    if(!user || !bcryptCompare){
        req.flash("error", "User Not Found");
        return res.redirect("back");
    }

    if(user[0].name === "admin"){
        res.render("admin-home");
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

router.post("/add-client", redirectLogin, async (req, res) => {
    const { name, surname, street, postcode } = req.body;
    const client = await clients.find({name: name, surname: surname})
    const user = await users.find({_id: req.session.userId});

    if(client.length > 0){
        return res.send("Client already Exists");
    } else {
        await clients.create({
            user: user[0].name,
            name: name, 
            surname: surname, 
            address: {
                street: street, 
                postcode: postcode
            }
        })

        res.redirect("/admin/dashboard");
      }
});

router.post("/admin/client/:name/:surname/add-invoice", redirectLogin, async (req, res) => {
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

    //add flash messaged for add invoice
});

router.post("/admin/:name/:surname/:id/edit-invoice", redirectLogin, async (req, res) => {
    const {date, time, amount, status} = req.body;
    await invoices.updateOne({_id: req.params.id}, {
        date: date, 
        time: time, 
        amount: amount, 
        status: status
    });

    res.redirect(`/admin/client/${req.params.name}/${req.params.surname}`);

    //add flash message for update successful
})

router.post("/:name/:surname/:id/delete-invoice",redirectLogin, async (req, res) => {
    await invoices.deleteOne({_id: req.params.id})
    res.redirect("back");
});

router.post("/admin/client/:id/edit-profile", redirectLogin, async (req, res) => {
    const { name, surname, street, postcode } = req.body;
    await clients.updateOne({_id: req.params.id}, {
        name: name, 
        surname: surname, 
        address: {
            street: street, 
            postcode: postcode
        }
    })
    console.log(postcode);
    res.send("User credentials successfully updated");
});

router.post("/:name/:surname/:id/delete-client", redirectLogin, async (req, res) => {
    await clients.deleteOne({_id: req.params.id})
    await invoices.remove({name: req.params.name, surname: req.params.surname})
    res.redirect("/admin/dashboard");
});

router.post("/contact", async (req, res) => {
    const { name, surname, email, number, enquiry } = req.body;
    const clients = await clients.find({name: name, surname: surname})
    if(clients){
        const transporter = nodemailer.createTransport({
            service: "outlook.com", 
            auth: {
               user: process.env.EMAIL,
               pass: process.env.PASS
            }
        })
    
        const html = `
            <h1>${name} ${surname} has sent you a message!</h1>
            <h3>Email Address: ${email}</h3>
            <h3>Phone Number: ${number}</h3>
            <div>
                <h3>Enquiry:</h3>
                <p>${enquiry}</p>
            </div>
        `
    
        const options = {
            from: process.env.EMAIL,
            to: "laformapilates@gmail.com",
            subject: `New Enquiry: ${name} ${surname}`, 
            html: html
        };
    
        transporter.sendMail(options, (err, info) => {
            if(err){
                return console.log(err);
            } else {
                console.log("sent: " + info.response);
            }
        })
    
        //add flash message for successful email sent
    
        res.redirect("back");
    } else {
        await clients.create({
            name: name, 
            surname: surname, 
        });

        const transporter = nodemailer.createTransport({
            service: "outlook.com", 
            auth: {
               user: process.env.EMAIL,
               pass: process.env.PASS
            }
        })
    
        const html = `
            <h1>${name} ${surname} has sent you a message!</h1>
            <h3>Email Address: ${email}</h3>
            <h3>Phone Number: ${number}</h3>
            <div>
                <h3>Enquiry:</h3>
                <p>${enquiry}</p>
            </div>
        `
    
        const options = {
            from: process.env.EMAIL,
            to: "louisruocco1@gmail.com",
            subject: `New Enquiry: ${name} ${surname}`, 
            html: html
        };
    
        transporter.sendMail(options, (err, info) => {
            if(err){
                return console.log(err);
            } else {
                console.log("sent: " + info.response);
            }
        })
    
        //add flash message for successful email sent
    
        res.redirect("back");
    }
})

router.post("/admin/add-user", async (req, res) => {
    const { name, password } = req.body;
    const user = await users.find({name: name});
    const hashedPassword = await bcrypt.hash(password, 8)
    if(user.length > 0){
        return console.log("user already exists!");
    } else {
        await users.create({
            name: name, 
            password: hashedPassword
        });
    }

    console.log("user added successfully");
    res.redirect("back");
})

module.exports = router;