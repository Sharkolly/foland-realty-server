import mongoose from "mongoose";

const mongoDBURL = process.env.MONGODBURL;
const mongoDBOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  connectTimeoutMS: 30000,
  socketTimeoutMS: 60000,
  serverSelectionTimeoutMS: 30000,
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
      console.error("MongoDB connection error:", err);
    });
    mongoose.connection.on("disconnected", () => {
      console.log("MongoDB disconnected");
    });
    mongoose.connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    });

    return "MongoDB connection established";
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

export default connectToMongoDB;
