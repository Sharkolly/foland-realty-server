const bcrypt = require("bcryptjs");
const User = require("../Models/User");
const jwt = require("jsonwebtoken");

const signUp = async (req, res) => {
  const { email, password, firstName, lastName, role } = req.body;
  // const profilePic = req.file ? req.file.path : "";

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = {
    email,
    password: hashedPassword,
    role,
    firstName,
    lastName,
    // profilePic,
  };

  try {
    const saveToDatabase = await new User({
      email,
      password: hashedPassword,
      role,
      firstName,
      lastName,
      // profilePic,
    });
    const user = await saveToDatabase.save();
    const userIdToString = await user._id.toString();
    const token = jwt.sign(
      { _id: userIdToString },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7h" }
    );    
    res.json({ token });
  } catch (err) {
    console.log(err.message);
  }
};

module.exports= { signUp };
