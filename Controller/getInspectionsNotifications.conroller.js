import { getInspectionsNotifications } from "../mongodb/controller/notification.model.js";

const getInspectionsNotification = async (req, res, next) => {
  // const { user } = req;
  // const userId = user._id;
  try {
    const inspectionNotifications = await getInspectionsNotifications();
    return res.status(200).json({
      success: true,
      message: "Inspections Notifications fetched successfully",
      response: inspectionNotifications,
    });
  } catch (error) {
    next(error);
  }
};

export default getInspectionsNotification;
