import Setting from "../../Models/Setting.js";
import { get_setting_notification } from "./settings.model.js";

export const setting_notification_controller = async (req, res, next) => {
  const { user } = req;
  try {    
    const notifications = await get_setting_notification(user);
    console.log(notifications);
    return res.status(200).json({ success: true, data: notifications });
  } catch (err) {
    next(err);
  }
};
