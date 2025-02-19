require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const { router } = require("./Routes/index");

const app = express();
const PORT = process.env.PORT || 5000;
const mongoDBURL = process.env.MONGODBURL;

app.use(cors({
  origin: ['http://localhost:5173']
}));
app.use(bodyParser());
app.use(cookieParser());

app.use('/', router)
router
app.get("/", (req, res) => {
  res.json({ message: "Worked" });
});

mongoose.connect(mongoDBURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  app.listen(PORT, () => {
    console.log("Server Started !!", PORT);
  });

}).catch(err => console.log(err.message));

