import User from "../Models/User.js";
import bcrypt from "bcryptjs";

export const reset_password = async (req, res, next) => {
  const { email, newPassword } = req.body;
  const regexForValidPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

  // check for email and password
  if (!email || !newPassword) {
    return res.status(403).json({ message: "Fill in the form" });
  }
  try {
    // check for user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(403).json({ message: "Email does not exist" });
    }

    // validate password
    if (!regexForValidPassword.test(newPassword)) {
      return res.status(403).json({
        message:
          "Password must have minimum of 8 characters, 1 Uppercase Letter, 1 Lowercase Letter, 1 Number and 1 Special Character",
      });
    }
    // hash password
    const hashPassword = await bcrypt.hash(newPassword, 10);

    //update password in the db
    user.password = hashPassword;

    // reset code and expiration time
    user.resetCode = null;
    user.resetCodeExpiration = null;

    // save to db
    await user.save();

    return res.status(201).json({ message: "Password Reset" });
  } catch (error) {
    console.log(error.message);
    // return res.status(500).json({ message: "Server error" });
    next(error);
  }
};
