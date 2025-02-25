require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const upload = require('./middleware/fileUpload');
const fs = require("fs");

const { router } = require("./Routes/index");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 5000;
const mongoDBURL = process.env.MONGODBURL;

// app.use(
//   cors({
//     origin: ["http://localhost:5173", "https://foland-realty.vercel.app/"],
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );

// app.use(errorHandler);
app.use(cors());
app.options("*", cors());
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "https://foland-realty.vercel.app");
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//   res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   next();
// });

app.use(bodyParser());
app.use(cookieParser());

app.use("/", router);

app.get("/", (req, res) => {
  res.json({ message: "Worked" });
});
app.get("/app", (req, res) => {
  res.json({ message: "App worked" });
});

mongoose
  .connect(mongoDBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server Started !!", PORT);
    });
  })
  .catch((err) => console.log(err.message));
