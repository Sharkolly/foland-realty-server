import dotenv from "dotenv";
dotenv.config();
import express from "express";
import db from "./helpers/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import { v4 } from "uuid";

import { router } from "./Routes/index.js";
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
      console.log(process.env.DATABASE_URL);
      console.log("Server Started !!", PORT);
    });
  })
  .catch((err) => console.log(err.message));
