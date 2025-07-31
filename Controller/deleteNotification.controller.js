import {
  deleteAlertNotification,
  deleteInspectionNotification,
  deleteMessageNotification,
} from "../mongodb/controller/notification.model.js";

export const deleteNotificationController = async (req, res, next) => {
  const { id, type } = req.params;
  const { user } = req;
  if (!id || !type) {
    return res.status(400).json({
      success: false,
      message: "Notification ID and type are required",
    });
  }
  try {
    if (type === "message") await deleteMessageNotification(user._id, id);
    if (type === "inspection") await deleteInspectionNotification(user._id, id);
    if (type === "alert") await deleteAlertNotification(user._id, id);
    return res
      .status(200)
      .json({ success: true, message: "Notification deleted successfully" });
  } catch (error) {
    next(error);
  }
};


