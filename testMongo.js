import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

mongoose.connect(process.env.MONGODBURL)
  .then(() => console.log("✅ MongoDB connecté"))
  .catch(err => console.error("❌ Connexion échouée :", err.message));
