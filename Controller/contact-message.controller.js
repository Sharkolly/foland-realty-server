import transporter from "../config/nodemailer.config.js";

const contactMessage = async (req, res, next) => {
  const { contactMessage, contactPhoneNumber, contactFullName, contactEmail } =
    req.body;
  const regexForValidEmail = /^[a-zA-Z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  if (!regexForValidEmail.test(contactEmail)) {
    return res
      .status(403)
      .json({ success: false, message: "Email is not a valid email" });
  }
  try {
    if (
      !contactMessage ||
      (!contactPhoneNumber && !contactFullName && !contactEmail)
    ) {
      res
        .status(401)
        .json({ success: false, message: "Please fill in the form!" });
    }

    //send the message to the email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `Contact Message from ${contactFullName}`,
      text: `${contactMessage} ${contactEmail}`,
    });

    res
      .status(201)
      .json({ success: true, message: "Message Sent Successfully" });
  } catch (err) {
    // res.status(501).json({ message: err.message, success: false });
    next(err)
  }
};

export default contactMessage;
