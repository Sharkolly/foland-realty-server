"use strict";

import dotenv from "dotenv";
dotenv.config();

import morgan from "morgan";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";

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
import connectToMongoDB from "./config/mongodb.config.js";
import limiter from "./config/rate_limit.config.js";
import documentRoute from "./Routes/documents.route.js";


// Configuration de la base de données MySQL (via Aiven)
const password = process.env.AIVEN_SERVICE_PASSWORD;
const databaseUrl = `mysql://avnadmin:${password}@foland-realty-2025-foland-realty-2025.j.aivencloud.com:24163/defaultdb`;
process.env.DATABASE_URL = databaseUrl;

// Initialisation de l'app Express
const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 5050;

// Middlewares globaux
app.use(morgan("dev"));
app.use(
  cors({
    origin: ["http://localhost:3000", "https://foland-realty.vercel.app"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes API
app.use("/api/foland-realty/auth", authRoute);
app.use("/api/foland-realty/user", tokenVerification, user);
app.use("/api/foland-realty/property", tokenVerification, propertyRoute);
app.use("/api/foland-realty/chat", tokenVerification, chat);
app.use("/api/foland-realty/subscribe", newsLetter);
app.use("/api/foland-realty/contact", contact);
app.use("/api/foland-realty/admin", adminRoute);
app.use("/api/foland-realty/auth/admin", AdminRoute);
app.use("/api/foland-realty/documents", documentRoute);

// Fichiers statiques
app.use("/uploads", express.static("uploads"));

// Gestion des erreurs et du rate limit
app.use(errorHandler);
app.use(limiter);

// Route d'accueil
app.get("/", (req, res) => {
  return res.status(200).json({ success: true, message: "Welcome to Foland Realty API" });
});

// Démarrage du serveur
const startServer = async () => {
  try {
    const useMongo = process.env.USE_MONGO !== "false";

    if (useMongo) {
      try {
        await connectToMongoDB();
      } catch (mongoErr) {
        console.warn("⚠️ MongoDB not connected. Continuing without MongoDB.");
      }
    } else {
      console.log("ℹ️ MongoDB disabled via USE_MONGO=false");
    }

    server.listen(PORT, () => {
      initSocket(server);
      console.log(`🚀 Server started on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Error starting server:", err);
    process.exit(1);
  }
};

startServer();
