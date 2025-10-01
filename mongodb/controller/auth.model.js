import User from "../../Models/User.js";

export const userSignUpMongoDB = async (
  email,
  hashedPassword,
  role,
  firstName,
  lastName,
  uuid,
  idVerificationSkipped,
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

    // profilePic,
  });

  const user = await saveToDatabase.save();
  const userIdToString = await user._id.toString();
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
  user
) => {
  const existingDevice = user.device.find(
    (d) =>
      d.deviceType === deviceType &&
      d.browser === browser &&
      d.ip === location.ip
  );

  if (existingDevice) {
    // Just update last login
    existingDevice.lastLogin = new Date();
    existingDevice.location.region = location.city; // optional update
    existingDevice.location.city = location.city; // optional update
    existingDevice.os = os;
  } else {
    // Add new device
    user.phone = "07035439642";
    user.device.push({
      lastLogin,
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

  await user.save();
  return;
};
