import { getMessageNotifications } from "../mongodb/controller/notification.model.js";

const getMessageNotification = async (req, res) => {   
 const { user } = req;
  const userId = user._id;
  try {
    const messageNotifications = await getMessageNotifications(userId);    
    return res.status(200).json({
      success: true,
      message: "Message Notifications fetched successfully",
      response: messageNotifications,
    });
  } catch (error) {
    next(error);
  }

}

export default getMessageNotification;