import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  checkUserExists,
} from "../mongodb/controller/auth.model.js";

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
      { _id: checkIfUserExist._id, role: checkIfUserExist.role  },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "3d",
      }
    );
    return res.status(201).json({ message: "Login Successful", token });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
}; 
