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
    idDocument: documentImage ? [documentImage] : null
    
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
