import Setting from "../../Models/Setting.js";
import User from "../../Models/User.js";



export const get_setting_notification = async (user) => {
  const settings = await Setting.findOne({ owner: user._id });
  return settings.notifications;
};

export const getUserSettingsAccountInfo = async (user) => {
  console.log(user._id);
  // const user_details = await Setting.findOne({ owner: user._id }).populate(
  //   "owner",
  //   "firstName lastName profile_picture phone role address gender date_of_birth"
  // );
  const user_details = await User.findOne({ _id: user._id }).select(
    "firstName lastName profile_picture phone role address gender date_of_birth"
  );

  return user_details;
};
