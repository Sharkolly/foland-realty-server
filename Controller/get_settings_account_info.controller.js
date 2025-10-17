import { getUserSettingsAccountInfo } from "../mongodb/controller/settings.model.js";

export const settings_account_info_controller = async (req, res, next) => {
  const { user } = req;

  try {
    const get_user_details = await getUserSettingsAccountInfo(user._id);
    res.status(200).json({ success: true, data: get_user_details });
  } catch (err) {
    next(err);
  }
};
