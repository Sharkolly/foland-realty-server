const User = require("../Models/User");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const forgot_password = async (req, res) => {
  const { email } = req.body;
  const regexForValidEmail = /^[a-zA-Z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  if (!email) {
    return res.status(403).json({ message: "Fill in your email" });
  }

  if (!regexForValidEmail.test(email)) {
    return res.status(403).json({ message: "Email is not a valid email" });
  }

  try {
    const checkForEmail = await User.findOne({ email });

    if (!checkForEmail) {
      return res.status(403).json({ message: "Email does not exist" });
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const hashCode = await bcrypt.hash(code, 10);
    const codeExpiration = Date.now() + 10 * 60 * 1000;

    console.log(codeExpiration);
    checkForEmail.resetCode = hashCode;
    checkForEmail.resetCodeExpiration = codeExpiration;
    await checkForEmail.save();

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

module.exports = { forgot_password };
