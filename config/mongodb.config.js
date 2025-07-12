import dotenv from "dotenv";
dotenv.config(); // Doit être tout en haut

import mongoose from "mongoose";
import logger from "./logger.js";

const mongoDBURL = process.env.MONGODBURL;
<<<<<<< HEAD

const mongoDBOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  connectTimeoutMS: 3000,
  socketTimeoutMS: 6000,
  serverSelectionTimeoutMS: 3000,
  retryWrites: true,
  retryReads: true,
};
=======
>>>>>>> fidele-lukeka

const connectToMongoDB = async () => {
  try {
    if (!mongoDBURL) {
      throw new Error("MONGODBURL is not defined in environment variables");
    }

    await mongoose.connect(mongoDBURL);

    mongoose.connection.on("error", (err) => {
<<<<<<< HEAD
      console.log("Error is here");
      logger.error("MongoDB connection error:", err);
=======
      console.error("❌ MongoDB connection error:", err);
>>>>>>> fidele-lukeka
    });

    mongoose.connection.on("disconnected", () => {
<<<<<<< HEAD
      logger.info("MongoDB disconnected");
=======
      console.warn("⚠️ MongoDB disconnected");
>>>>>>> fidele-lukeka
    });

    mongoose.connection.on("connected", () => {
<<<<<<< HEAD
      logger.info("MongoDB connected successfully");
=======
      console.log("✅ MongoDB connected successfully");
>>>>>>> fidele-lukeka
    });

    return "MongoDB connection established";
  } catch (error) {
<<<<<<< HEAD
    logger.error("MongoDB connection error:", error);
=======
    console.error("❌ MongoDB connection failed:", error);
    throw error;
>>>>>>> fidele-lukeka
  }
};

export default connectToMongoDB;
