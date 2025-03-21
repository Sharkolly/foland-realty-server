import NewsLetter from "../Models/NewsLetter.js";

export const newsLetter = async (req, res) => {
  const { email } = req.body;
  const regexForValidEmail = /^(?!.*\.\.)[a-zA-Z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  if (!email) {
    return res.status(403).json({ message: "Enter email address!" });
  }

  if (!regexForValidEmail.test(email)) {
    return res
      .status(403)
      .json({ message: "Email is not a valid email" });
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
