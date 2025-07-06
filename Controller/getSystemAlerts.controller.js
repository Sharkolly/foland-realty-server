import { getSystemAlertsNotifications } from "../mongodb/controller/notification.model.js";

const getAlertNotification = async (req, res, next) => {   
 const { user } = req;
  const userId = user._id;
  try {
    const alertsNotifications = await getSystemAlertsNotifications(userId);
    return res.status(200).json({
      success: true,
      message: "System Alerts Notifications fetched successfully",
      response: alertsNotifications,
    });
  } catch (error) {
    next(error);
  }

}

export default getAlertNotification;