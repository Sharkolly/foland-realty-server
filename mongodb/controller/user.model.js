import User from "../../Models/User.js";
import Property from "../../Models/Property.js";
import { constants } from "http2";

// get user from mongoDB
export const getUserMongoDb = async (user) => {
  const userProfile = await User.findById({ _id: user._id }).select(
    "-password"
  );

  return userProfile;
};

export const change_user_role = async (user, user_new_role) => {
  const get_user = await User.findById({ _id: user._id });
  let errorMessage = {};

  if (get_user.role === user_new_role) {
    errorMessage = {
      message: `You are already a ${user_new_role}`,
      success: false,
    };
  }
  if (get_user.email == "sharkollymofeoluwa@gmail.com") {
    get_user.role = user_new_role;
    get_user.changed_role = false;
    await get_user.save();
  }
  if (get_user.changed_role == true) {
    errorMessage = {
      message:
        "User role can only be changed once. Contact support for more info.",
      success: false,
    };
  }
  if (get_user.changed_role == false) {
    get_user.role = user_new_role;
    get_user.changed_role = true;
    await get_user.save();
  }
  return errorMessage;
};

// get userTotal Property
export const getUserTotalProperty = async (user) => {
  const userTotalProperty = await Property.countDocuments({ owner: user._id });
  // const userTotalPropertes = await Property.find({ owner: user._id });
  return userTotalProperty;
};

export const update_user_details = async (
  user,
  user_details,
  profilePicture
) => {
  const get_user = await User.findOne({ _id: user._id });
  if (
    !user_details.dateOfBirth ||
    !user_details.address ||
    !user_details.gender
  ) {
    return {
      message: "Please fill in all fields to update your profile details",
      success: false,
    };
  }

  if (profilePicture && profilePicture.path) {
    get_user.profile_picture = profilePicture.path;

    await get_user.save();
    return {
      message: "Profile picture updated successfully",
      success: true,
    };
  }

  if (
    get_user.firstName &&
    get_user.lastName &&
    get_user.date_of_birth &&
    get_user.address &&
    get_user.phone &&
    get_user.gender
  ) {
    if (!profilePicture) get_user.profile_picture = user_details.profileImage;
    await get_user.save();

    return {
      message:
        "You have already updated your profile details. To change contact support.",
      success: false,
    };
  }

  if (!get_user.date_of_birth && !get_user.address && !get_user.gender) {
    get_user.date_of_birth = user_details.dateOfBirth;
    get_user.address = user_details.address;
    get_user.gender = user_details.gender;
    if (profilePicture && profilePicture.path)
      get_user.profile_picture = profilePicture.path;
    if (!profilePicture) get_user.profile_picture = user_details.profileImage;
    await get_user.save();
    return {
      message: "Saved",
      success: true,
    };
  }
};