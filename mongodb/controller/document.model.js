import User from "../../Models/User.js";

export const get_document_security_details = async (user) => {
  const user_device_and_email = await User.findById({ _id: user._id }).select(
    "device email"
  ).sort({createdAt: -1});
  if(!user_device_and_email){
    throw new Error("User not found");
  }

  return user_device_and_email;
};
