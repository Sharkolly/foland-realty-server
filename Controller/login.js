const bcrypt = require("bcryptjs");
const User = require("../Models/User");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!password || !email) {
    return res.status(403).json({ message: "Complete the form" });
  }
  try {
    const checkIfUserExist = await User.findOne({ email:  email.toLowerCase() });
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
      { _id: checkIfUserExist._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "7h",
      }
    );
    return res.status(201).json({ message: "Login Successful", token });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { login };
