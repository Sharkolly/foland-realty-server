import dotenv from "dotenv";
dotenv.config(); // Doit être tout en haut

import mongoose from "mongoose";
import logger from "./logger.js";

const mongoDBURL = process.env.MONGODBURL;

const mongoDBOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  connectTimeoutMS: 3000,
  socketTimeoutMS: 6000,
  serverSelectionTimeoutMS: 3000,
  retryWrites: true,
  retryReads: true,
};

const connectToMongoDB = async () => {
  try {
    if (!mongoDBURL) {
      throw new Error("MONGODBURL is not defined in environment variables");
    }

    await mongoose.connect(mongoDBURL, mongoDBOptions);

    mongoose.connection.on("error", (err) => {
      logger.error("❌ MongoDB connection error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      logger.warn("⚠️ MongoDB disconnected");
    });

    mongoose.connection.on("connected", () => {
      logger.info("✅ MongoDB connected successfully");
    });

    return "✅ MongoDB connection established";
  } catch (error) {
    logger.error("❌ MongoDB connection failed:", error);
    throw error; // important pour que le serveur sache que la connexion a échoué
  }
};

export default connectToMongoDB;
