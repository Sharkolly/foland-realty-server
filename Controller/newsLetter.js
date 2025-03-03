const NewsLetter = require("../Models/NewsLetter");

const newsLetter = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(403).json({ message: "Enter email address!" });
  }
  try {
    const checkIfEmailExist = await NewsLetter.findOne({ email });
    if (checkIfEmailExist) {
      return res.status(403).json({ message: "Email exists already!" });
    }
    const newEmail = new NewsLetter({ email });
    await newEmail.save();

    return res.status(201).json({ message: "Subscribed successfully!" });
  } catch (err) {
    return res.status(501).json({ message: "Something went wrong" });
  }
};

module.exports = { newsLetter };
