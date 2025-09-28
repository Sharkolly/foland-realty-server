import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createUser, checkUser } from "../mysql/controllers/user.model.js";
import { v4 } from "uuid";
import {
  userSignUpMongoDB,
  checkUserExists,
} from "../mongodb/controller/auth.model.js";

export const signUp = async (req, res, next) => {
  const {
    email,
    password,
    firstName,
    lastName,
    role,
    idVerificationSkipped,
    phone,
  } = req.body;
  const regexForValidEmail = /^[a-zA-Z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  console.log(
    email,
    password,
    firstName,
    lastName,
    role,
    idVerificationSkipped,
    phone
  );

  const regexForValidPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

  // check for user credentials
  if (!firstName || !lastName || !password || !email || !role || !phone) {
    return res.status(403).json({ message: "Complete the form" });
  }
  // validate email
  if (!regexForValidEmail.test(email)) {
    return res
      .status(403)
      .json({ emailValidationError: "Email is not a valid email" });
  }
  // validate password
  if (!regexForValidPassword.test(password)) {
    return res.status(403).json({
      passwordValidationError:
        "Password must have minimum of 8 characters, 1 Uppercase Letter, 1 Lowercase Letter, 1 Number and 1 Special Character",
    });
  }

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const documentImage = req.file
      ? {
          path: req.file.path,
          name: req.file.originalname,
        }
      : null;

    //check user in mongoDb
    const user = await checkUserExists(email);
    //check user in MySql
    // const checkUserMysql = await checkUser(email);

    // if (checkIfUserExist || checkUserMysql) {
    if (user) {
      return res
        .status(403)
        .json({ emailValidationError: "Email already Exist" });
    }
    // generate a uuid
    const uuid = v4();

    // save to mySQL
    // const mySqlSave = await createUser(email, uuid, role);

    const { userIdToString } = await userSignUpMongoDB(
      email,
      hashedPassword,
      role,
      firstName,
      lastName,
      uuid,
      idVerificationSkipped,
      phone,
      documentImage
    );

    // sign a token and send to browser
    const token = jwt.sign(
      { _id: userIdToString, role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "5d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 86400 * 1000 * 5, // 5 days in milliseconds
    });
    return res
      .status(201)
      .json({ success: true, token, message: "Login Successful" });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
