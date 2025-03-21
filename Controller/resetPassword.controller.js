import User from "../Models/User.js";
import nodemailer from "nodemailer";

export const reset_password = async (req, res) => {
  const { email, newPassword } = req.body;
  const regexForValidPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

  if (!email || !newPassword) {
    return res.status(403).json({ message: "Fill in the form" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(403).json({ message: "Email does not exist" });
    }

    if (!regexForValidPassword.test(newPassword)) {
      return res.status(403).json({
        message:
          "Password must have minimum of 8 characters, 1 Uppercase Letter, 1 Lowercase Letter, 1 Number and 1 Special Character",
      });
    }

    const hashPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashPassword;
    user.resetCode = null;
    user.resetCodeExpiration = null;
    await user.save();

    return res.status(201).json({ message: "Password Reset" });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};