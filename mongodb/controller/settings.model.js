import Setting from "../../Models/Setting.js";

export const get_setting_notification = async (user) => {
  const settings = await Setting.findOne({ owner: user._id });
  return settings.notifications;
};

