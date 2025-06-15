import NewsLetter from "../Models/NewsLetter.js";

export const newsLetter = async (req, res, next) => {
  const { email } = req.body;
  const regexForValidEmail =
    /^(?!.*\.\.)[a-zA-Z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!email) {
      return res.status(403).json({ message: "Enter email address!" });
    }
    
    // validate email
  if (!regexForValidEmail.test(email)) {
    return res.status(403).json({ message: "Email is not a valid email" });
  }
  try {
    // check if user email exist
    const checkIfEmailExist = await NewsLetter.findOne({ email });
    if (checkIfEmailExist) {
      return res.status(403).json({ message: "Email exists already!" });
    }
    // save to db
    const newEmail = new NewsLetter({ email: email.toLowerCase() });
    await newEmail.save();
    return res.status(201).json({ message: "Subscribed successfully!" });
  } catch (err) {
    // return res.status(501).json({ message: "Something went wrong" });
    next(err);
  }
};
