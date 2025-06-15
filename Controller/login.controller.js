import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { checkUserExists } from "../mongodb/controller/auth.model.js";

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  //check for email and password
  if (!password || !email) {
    return res.status(403).json({ message: "Complete the form" });
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
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }

    // sign a jwt token then send to the browser
    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "3d",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 86400 * 3000, // 1 day in milliseconds
    });

    return res.status(201).json({ message: "Login Successful", token });
  } catch (err) {
    // return res.status(500).json({ message: "Server error" });
    next(err);
  }
};
