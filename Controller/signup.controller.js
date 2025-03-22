import User from "../Models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createUser, checkUser } from "../mysql/controllers/user.model.js";
import db from "../helpers/db.js";
import { v4 } from "uuid";

export const signUp = async (req, res) => {
  const { email, password, firstName, lastName, role } = req.body;
  // const profilePic = req.file ? req.file.path : "";
  const regexForValidEmail = /^[a-zA-Z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  const regexForValidPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

  if (!firstName || !lastName || !password || !email || !role) {
    return res.status(403).json({ message: "Complete the form" });
  }

  if (!regexForValidEmail.test(email)) {
    return res
      .status(403)
      .json({ emailValidationError: "Email is not a valid email" });
  }
  if (!regexForValidPassword.test(password)) {
    return res.status(403).json({
      passwordValidationError:
        "Password must have minimum of 8 characters, 1 Uppercase Letter, 1 Lowercase Letter, 1 Number and 1 Special Character",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const checkIfUserExist = await User.findOne({ email });
    const checkUserMysql = await checkUser(email);

    if (checkIfUserExist || checkUserMysql) {
      return res
        .status(403)
        .json({ emailValidationError: "Email already Exist" });
    }
    const uuid = v4();

    const mySqlSave = await createUser(email, uuid, role);
    const saveToDatabase = await new User({
      email: email.toLowerCase(),
      password: hashedPassword,
      role,
      firstName,
      lastName,
      uuid,
      // profilePic,
    });

    const user = await saveToDatabase.save();
    const userIdToString = await user._id.toString();
    const token = jwt.sign(
      { _id: userIdToString },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7h" }
    );
    return res.status(201).json({ token, message: "Login Successful" });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};
