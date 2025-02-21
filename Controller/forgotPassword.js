const User = require("../Models/User");
const nodemailer = require("nodemailer");


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
    };
  
    if (!regexForValidEmail.test(email)) {
      return res.status(403).json({ message: "Email is not a valid email" });
    };
  
    try {
      const checkForEmail = await User.findOne({ email });
  
      if (!checkForEmail) {
        return res.status(403).json({ message: "Email does not exist" });
      };
  
      const code = Math.floor(100000 + Math.random() * 999999).toString();
      const codeExpiration = Date.now() + 10 * 60 * 1000;
  
      checkForEmail.resetCode = code;
      checkForEmail.restCodeExpiration = codeExpiration;
      await checkForEmail.save();
  
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: checkForEmail.email,
        subject: "Password Reset Code",
        text: `Your password reset code is ${code}. It is valid for 10 minutes.`,
      });
      return res.status(201).json({ message: "Reset code sent to email" });
    } catch (err) {
      return res.status(500).json({ message: "Server error" });
    };
  };

  module.exports = { forgot_password };