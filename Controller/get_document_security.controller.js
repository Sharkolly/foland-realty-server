import { get_document_security_details } from "../mongodb/document.model.js";

export const get_document_security = async (req, res, next) => {
  const { user } = req;
  try {
    const user_device_and_email = await get_document_security_details(user);
    res.status(200).json({success: true, data: user_device_and_email });
  } catch (err) {
    next(err);
  }
};
