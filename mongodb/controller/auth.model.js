import Setting from "../../Models/Setting.js";
import User from "../../Models/User.js";

export const userSignUpMongoDB = async (
  email,
  hashedPassword,
  role,
  firstName,
  lastName,
  uuid,
  phone,
  documentImage
) => {
  const saveToDatabase = await new User({
    email: email.toLowerCase(),
    password: hashedPassword,
    role,
    firstName,
    lastName,
    uuid,
    phone,
    idDocument: documentImage ? [documentImage] : null,
  });

  const user = await saveToDatabase.save();
  const userIdToString = await user._id.toString();
  const newSetting = await new Setting({
    owner: user._id, // your User _id
  });
  await newSetting.save();
  return { userIdToString, role: user.role };
};

export const checkUserExists = async (email) => {
  const checkIfUserExist = await User.findOne({ email: email.toLowerCase() });
  return checkIfUserExist;
};

export const addUserDevice = async (
  lastLogin,
  ip,
  browser,
  os,
  deviceId,
  deviceType,
  location,
  user,
  model,
  vendor
) => {
  const existingDevice = user.device.find(
    (d) => d.deviceType === deviceType && d.browser === browser
  );

  if (existingDevice) {
    // Just update last login
    existingDevice.lastLogin = new Date();
    existingDevice.location = location
    existingDevice.os = os;
  } else {
    // Add new device
    user.phone = "07035439642";
    user.device.push({
      lastLogin,
      model,
      vendor,
      ip,
      browser,
      os,
      deviceId,
      deviceType,
      location,
    });
  }

  // Update user's lastLogin field
  user.device.lastLogin = new Date();
   user.verified = true;

  await user.save();
  return;
};
