const express = require("express");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const mongoose = require("mongoose");
const flash = require("connect-flash");
const app = express();

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening at ${port}`));