"use strict";
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import { Server } from "socket.io";
import http from "http";
import { v4 } from "uuid";
import bcrypt from "bcryptjs";
import path from 'path';
import fs from 'fs'


import { initSocket } from "./helpers/io.js";
import authRoute from "./Routes/authRoute.js";
import user from "./Routes/user.js";
import propertyRoute from "./Routes/propertyRoute.js";
import adminRoute from "./Routes/admin.routes.js";
import AdminRoute from "./Routes/Admin/admin.route.js";
import newsLetter from "./Routes/newsLetter.route.js";
import chat from "./Routes/chat.route.js";
import contact from "./Routes/contact.route.js";
import tokenVerification from "./middleware/tokenVerification.js";
import db from "./helpers/db.js";
import errorHandler from "./middleware/errorHandler.js";

const password = process.env.AIVEN_SERVICE_PASSWORD;
const databaseUrl = `mysql://avnadmin:${password}@foland-realty-2025-foland-realty-2025.j.aivencloud.com:24163/defaultdb`;

process.env.DATABASE_URL = databaseUrl;

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;
const mongoDBURL = process.env.MONGODBURL;

// app.use(errorHandler);
// app.use(cors());
// app.options("*", cors());

// const corsOptions = {
//     origin: [
//       "http://localhost:5173",
//       "http://localhost:3000",
//       "https://foland-realty-nextjs.vercel.app",
//       "http://localhost:5174",
//       // "https://practice-socketio.vercel.app",
//       "https://foland-realty.vercel.app",
//     ],
//     credentials: true,
//     allowedHeaders: [
//       'Content-Type', 
//       'Authorization', 
//       'X-Requested-With'
//     ],
//     methods: ['GET', 'POST', 'PUT', 'DELETE']
//   }

  // app.use(cors(corsOptions));
  app.use(cors());

// Special handling for preflight requests
// app.options('*', cors(corsOptions));

app.use(bodyParser());
app.use(cookieParser());

app.use("/api/foland-realty/auth", authRoute);
app.use("/api/foland-realty/user", tokenVerification, user);
app.use("/api/foland-realty/property", tokenVerification, propertyRoute);
app.use("/api/foland-realty/chat", tokenVerification, chat);
app.use("/api/foland-realty/subscribe", newsLetter);
app.use("/api/foland-realty/contact", contact);
app.use("/api/foland-realty/admin", adminRoute);
app.use("/api/foland-realty/auth/admin", AdminRoute);

app.use("/uploads", express.static("uploads"));

// const addUser = async () => {
//   const uuid = v4();
//   const password = "Adesanya1967@"
//   const hashedPassword = await bcrypt.hash(password, 10);
//   const newUser = await db.admin.create({
//     data: {
//       email: "sharkollymofeoluwa@gmail.com",
//       password: hashedPassword,
//       uuid,
//     },
//   });

//   console.log(newUser);
// };

app.get("/", (req, res) => {
  res.json({ success: true });
});


mongoose
  .connect(mongoDBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    server.listen(PORT, () => {
      // addUser();


      initSocket(server);
      console.log("Server Started !!", PORT);
    });
  })
  .catch((err) => console.log(err.message));
  // server.listen(PORT, () => {
  //   // addUser();


  //   initSocket(server);
  //   console.log("Server Started !!", PORT);
  // });