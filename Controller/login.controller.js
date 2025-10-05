import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  addUserDevice,
  checkUserExists,
} from "../mongodb/controller/auth.model.js";
import logger from "../config/logger.js";

export const login = async (req, res, next) => {
  const { email, password, userLocation } = req.body;
  const { lastLogin, ip, browser, os, deviceId, deviceType, model, vendor } =
    req.deviceInfo;

  const {
    country,
    region,
    city,
    timezone,
    timezone_gmt,
    continent,
    country_phone,
    org,
    latitude,
    longitude,
  } = userLocation || {};
  const location = {
    country,
    utc: timezone_gmt,
    continent,
    calling_code: country_phone,
    org,
    region,
    city,
    timezone,
    mobile_network: org,
    ip: userLocation.ip,
    latitude,
    longitude,
  };

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await checkUserExists(email);
    if (!user) {
      return res
        .status(403)
        .json({ message: "Email is not registered. Please Sign Up." });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }

    const jwtSecret = process.env.JWT_SECRET_KEY;
    if (!jwtSecret) {
      logger.error("JWT_SECRET_KEY is not defined in environment variables");
      return res.status(500).json({ message: "Server configuration error" });
    }

    const token = jwt.sign({ _id: user._id, role: user.role }, jwtSecret, {
      expiresIn: "5d",
    });

    const addUserDeviceToDB = await addUserDevice(
      lastLogin,
      ip,
      browser,
      os,
      deviceId,
      deviceType,
      location,
      user,
      model,
      vendor
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      // domain: "foland-realty.vercel.app",
      path: "/",
      maxAge: 5 * 24 * 60 * 60 * 1000, // 5 jours
    });

    return res.status(201).json({ message: "Login Successful", token });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
