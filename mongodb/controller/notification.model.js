import logger from "../../config/logger.js";
import Notification from "../../Models/Notification.js";

export const getAllNotifications = async (userId) => {
  try {
    const notifications = await Notification.find({ userId }).sort({
      createdAt: -1,
    });
    return notifications;
  } catch (error) {
    logger.error("Error fetching notifications:", error);
  }
};

export const getInspectionsNotifications = async (userId) => {
  try {
    const notifications = await Notification.findOne(
      { owner: "67df1e00c84c8cbe33428ee9" },
      { inspections: 1, _id: 0 }
    ).sort({ createdAt: -1 });
    return notifications;
  } catch (error) {
    logger.error("Error fetching inspection notifications:", error);
  }
};
export const getSystemAlertsNotifications = async () => {
  try {
    const notifications = await Notification.findOne(
      { owner: "67df1e00c84c8cbe33428ee9" },
      { alerts: 1, _id: 0 }
    ).sort({ createdAt: -1 });
    return notifications;
  } catch (error) {
    logger.error("Error fetching system alert notifications:", error);
  }
};

export const getMessageNotifications = async (userId) => {  
  try {
    const notifications = await Notification.findOne(
      { owner: userId },
      { messages: 1, _id: 0 }
    ).sort({ createdAt: -1 });
    return notifications;
  } catch (error) {
    logger.error("Error fetching message notifications:", error);
  }
};

export const deleteMessageNotification = async (userId, id) => {
  try {
    const notification = await Notification.updateOne(
      { owner: userId },
      { $pull: { messages: { _id: id } } }
    );
    return notification;
  } catch (error) {
    logger.error("Error deleting message notification:", error);
  }
};
