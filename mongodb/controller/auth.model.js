import User from "../../Models/User.js";

export const userSignUpMongoDB = async (
  email,
  password,
  role,
  firstName,
  lastName,
  uuid,
  hashedPassword
) => {
  const saveToDatabase = await new User({
    email: email.toLowerCase(),
    password: hashedPassword,
    role,
    firstName,
    lastName,
    uuid,
    // profilePic,
  });
  const user = await saveToDatabase.save();
  const userIdToString = await user._id.toString();
  return {userIdToString, role: user.role};
};


export const checkUserExists = async (email) => {
  const checkIfUserExist = await User.findOne({ email: email.toLowerCase() });
  return checkIfUserExist;
}