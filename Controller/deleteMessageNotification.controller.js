import { deleteMessageNotification } from "../mongodb/controller/notification.model.js";



const DeleteMessageNotificationController = async (req, res) => {
  const { user } = req;
  const userId = user._id;
  const { id } = req.params;

  console.log(id, userId);

  try {
    // Assuming deleteMessageNotification is a function that deletes the notification
    const result = await deleteMessageNotification(userId, id);
    console.log(result);
    
    if (result) {
      return res.status(200).json({
        success: true,
        message: "Message Notification deleted successfully",
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }
  } catch (error) {
    console.error("Error deleting message notification:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while deleting the notification",
    });
  }
}

export default DeleteMessageNotificationController;