import { update_user_details } from "../mongodb/controller/user.model.js";

export const change_user_details = async (req, res, next) => {
  const { user } = req;
  const { user_details } = req.body;
  try {
    const update_user = await update_user_details(user, user_details);
    if (update_user.success === false) {
      return res
        .status(400)
        .json({ success: update_user.success, message: update_user.message });
    } else {
      return res
        .status(200)
        .json({ success: update_user.success, message: update_user.message });
      // res.status(200).json({ success: true, message: "Saved" });
    }
  } catch (err) {
    next(err);
  }
};
