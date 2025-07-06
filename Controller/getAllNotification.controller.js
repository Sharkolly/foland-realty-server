import logger from "../config/logger.js";
import { getAllNotifications } from "../mongodb/controller/notification.model.js";

const getAllNotification = async (req, res, next) => {
  // const { user } = req;
  // const userId = user._id;
  try {
    const allNotifications = await getAllNotifications();
    return res.status(200).json({
      success: true,
      message: "Notifications fetched successfully",
      data: allNotifications,
    });
  } catch (error) {
    next(error);
  }
};

export default getAllNotification;
