import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { checkUser } from "../../mysql/controllers/Admin/admin.model.js";

export const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  if ( !email || !password) {
    return res.status(403).json({ message: "Complete the form" });
  }
  try {
    const checkIfUserExist = await checkUser(email);
    if (!checkIfUserExist) {
      return res
        .status(403)
        .json({ message: "Email is not registered. Please Sign Up." });
    }
    const comparePassword = await bcrypt.compare(
      password,
      checkIfUserExist.password
    );

    if (!comparePassword) {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }
    const token = jwt.sign(
      { _id: checkIfUserExist.id },
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
