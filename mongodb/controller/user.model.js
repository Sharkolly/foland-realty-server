import User from "../../Models/User.js";
import Property from "../../Models/Property.js";

export const getUserMongoDb = async (user) => {
  const userProfile = await User.findById({ _id: user._id }).select(
    "-password"
  );
  return userProfile;
};
export const getUserTotalProperty = async (user) => {
  const userTotalProperty = await Property.countDocuments({owner: user._id });
  const userTotalPropertes = await Property.find({owner: user._id });
  return userTotalProperty;
};
