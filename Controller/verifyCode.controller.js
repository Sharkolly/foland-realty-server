import User from "../Models/User.js";
import bcrypt from "bcryptjs";

export const verify_code = async (req, res) => {
  const { email, code } = req.body;

  if (!email || !code) {
    return res.status(403).json({ message: "Enter the verification code." });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(403).json({ message: ' "Email does not exist" ' });
    }

    const compareCode = await bcrypt.compare(code, user.resetCode);
    if (!compareCode || Date.now() > user.resetCodeExpiration) {
      return res.status(403).json({ message: "Invalid or expired code" });
    }

    if (Date.now > user.resetCodeExpiration) {
      user.resetCode = null;
      user.resetCodeExpiration = null;
      await user.save();
    }
    return res.status(201).json({ message: "Code Verified" });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};