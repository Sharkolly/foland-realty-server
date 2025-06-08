import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { checkUserExists } from "../mongodb/controller/auth.model.js";

export const login = async (req, res) => {
  const { email, password } = req.body;

  //check for email and password
  if (!password || !email) {
    return res.status(403).json({ message: "Complete the form" });
  }
  try {
    // check if user exist
    const checkIfUserExist = await checkUserExists(email);
    if (!checkIfUserExist) {
      return res
        .status(403)
        .json({ message: "Email is not registered. Please Sign Up." });
    }

    // compare the password
    const comparePassword = await bcrypt.compare(
      password,
      checkIfUserExist.password
    );

    if (!comparePassword) {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }

    // sign a jwt token then send to the browser
    const token = jwt.sign(
      { _id: checkIfUserExist._id, role: checkIfUserExist.role },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "3d",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === "production",
      secure: true,
      sameSite: 'none',
      maxAge: 86400 * 1000, // 1 day in milliseconds
    });
    // res.cookie("token", token, {
    //   httpOnly: true,
    //   secure: true, // Must be true for sameSite: 'none'
    //   sameSite: "none", // Required for cross-origin
    //   path: "/", // Important for all routes
    //   domain:
    //     process.env.NODE_ENV === "production"
    //       ? ".vercel.app" // Note the leading dot for subdomains
    //       : undefined, // Omit for localhost
    //   maxAge: 86400 * 1000,
    //   // Add this for older browser compatibility
    //   partitioned: process.env.NODE_ENV === "production", // Chrome 109+ for third-party cookies
    // });
    // res.setHeader(
    //   "Access-Control-Allow-Origin",
    //   "https://foland-realty-nextjs.vercel.app"
    // );
    // res.setHeader("Access-Control-Allow-Credentials", "true");
    // res.setHeader("Vary", "Origin"); // Important for credentialed requests
    return res.status(201).json({ message: "Login Successful", token });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};
