"use strict";

import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";

import authRoute from "./Routes/authRoute.js";
import user from "./Routes/user.js";
import propertyRoute from "./Routes/propertyRoute.js";
import tokenVerification from "./middleware/tokenVerification.js";
// import errorHandler from "./middleware/errorHandler.js";

const password = process.env.AIVEN_SERVICE_PASSWORD;
const databaseUrl = `mysql://avnadmin:${password}@foland-realty-2025-foland-realty-2025.j.aivencloud.com:24163/defaultdb`;

process.env.DATABASE_URL = databaseUrl;

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

app.use("/api/auth", authRoute);
app.use("/api/foland-realty", tokenVerification, user);
app.use("/api/foland-realty/property", tokenVerification, propertyRoute);

app.use("/uploads", express.static("uploads"));

app.get("/", (req,res) => {
  res.json({ success: true });
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
