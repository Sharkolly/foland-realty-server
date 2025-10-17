import Setting from "../../Models/Setting.js";

export const get_setting_notification = async (user) => {
  const settings = await Setting.findOne({ owner: user._id });
  return settings.notifications;
};

export const getUserSettingsAccountInfo = async (id) => {
  const user_details = await Setting.findOne({ owner: id }).populate(
    "owner",
    "firstName lastName profile_picture phone role address gender date_of_birth"
  );

  return user_details.owner;
};
