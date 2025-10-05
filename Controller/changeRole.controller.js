import { change_user_role } from "../mongodb/controller/user.model.js";

export const change_user_role_controller = async (req, res, next) => {
  const { user } = req;
  const { role } = req.body;

  try {
    const { success, message } = await change_user_role(user, role);
    if (success === false) {
      return res.status(400).json({ success: false, message });
    }
    
    return res
      .status(200)
      .json({ success: true, message: "User role updated successfully" });
  } catch (error) {
    next(error);
  }
};
