import User from "../Models/User.js";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";

//configure nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const forgot_password = async (req, res) => {
  //get email
  const { email } = req.body;
  const regexForValidEmail = /^[a-zA-Z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  if (!email) {
    return res.status(403).json({ message: "Fill in your email" });
  }
  // validate the email
  if (!regexForValidEmail.test(email)) {
    return res.status(403).json({ message: "Email is not a valid email" });
  }

  try {
    // check if email exist
    const checkForEmail = await User.findOne({ email: email.toLowerCase() });

    if (!checkForEmail) {
      return res.status(403).json({ message: "Email does not exist" });
    }

    // randomize a code
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    //hash the code
    const hashCode = await bcrypt.hash(code, 10);

    // give an expiration time which is 10 minutes
    const codeExpiration = Date.now() + 10 * 60 * 1000;

    //save to db
    checkForEmail.resetCode = hashCode;
    checkForEmail.resetCodeExpiration = codeExpiration;
    await checkForEmail.save();

    //send the message to the email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: checkForEmail.email,
      subject: "Foland Realty Password Reset Code",
      text: `Your password reset code is ${code}. It is valid for 10 minutes. Don't share it with anyone.`,
    });
    return res.status(201).json({ message: "Reset code sent to email" });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};
