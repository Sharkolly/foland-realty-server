import dotenv from "dotenv";
dotenv.config(); // Doit être tout en haut

import mongoose from "mongoose";

const mongoDBURL = process.env.MONGODBURL;

const connectToMongoDB = async () => {
  try {
    if (!mongoDBURL) {
      throw new Error("MONGODBURL is not defined in environment variables");
    }

    await mongoose.connect(mongoDBURL);

    mongoose.connection.on("error", (err) => {
      console.error("❌ MongoDB connection error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("⚠️ MongoDB disconnected");
    });

    mongoose.connection.on("connected", () => {
      console.log("✅ MongoDB connected successfully");
    });

    return "MongoDB connection established";
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    throw error;
  }
};

export default connectToMongoDB;
