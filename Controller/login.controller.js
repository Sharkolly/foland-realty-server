import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { checkUserExists } from "../mongodb/controller/auth.model.js";

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!password || !email) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    // check if user exist
    const user = await checkUserExists(email);
    if (!user) {
      return res
        .status(403)
        .json({ message: "Email is not registered. Please Sign Up." });
    }

    // compare the password
    const isValidPassword = await bcrypt.compare(
      password,
      user.password
    );

    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }

    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "3d" }
    );

    const isProduction = process.env.NODE_ENV === "production";
    const isLocalhostAccess = req.get("origin")?.includes("localhost");

    res.cookie("token", token, {
      httpOnly: true,
      secure: true, // Set secure to true in production
      sameSite: 'none', // Set sameSite to none in production
      maxAge: 86400 * 1000, // 1 day in milliseconds
    });

    return res.status(201).json({ message: "Login Successful", token });
  } catch (err) {
    // return res.status(500).json({ message: "Server error" });
    next(err);
  }
};