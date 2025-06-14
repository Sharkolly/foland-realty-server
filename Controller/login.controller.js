import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { checkUserExists } from "../mongodb/controller/auth.model.js";

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!password || !email) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await checkUserExists(email);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
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
      secure: isProduction, 
      sameSite: isLocalhostAccess ? "none" : isProduction ? "none" : "lax", 
      domain: isLocalhostAccess ? undefined : isProduction ? ".foland-realty.vercel.app" : undefined, 
      path: "/",
      maxAge: 86400 * 1000,
    });

    return res.status(200).json({ 
      message: "Login successful",
      user: {
        _id: user._id,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};