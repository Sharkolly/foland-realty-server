import Notification from "../../Models/Notification.js";

const notificationControllerSocket = async (
  notif,
  messageNotificationDetails,
  owner,
  userID,
  message
) => {
  if (!notif) {
    // First time: create the Notification doc with message
    await Notification.create({
      owner,
      messages: [messageNotificationDetails],
    });
  } else {
    // Check if any message in messages[] has same senderID
    const existingMessage = notif.messages.find(
      (msg) => msg.sender.toString() === userID.toString()
    );

    if (existingMessage) {
      // Update that message instead of pushing a new one
      await Notification.updateOne(
        { owner, "messages.sender": userID },
        {
          $set: {
            "messages.$.message": message,
            "messages.$.createdAt": new Date(), // optional
          },
        }
      );
    } else {
      // No message from this senderID yet, so push it
      await Notification.updateOne(
        { owner },
        {
          $push: { messages: messageNotificationDetails },
        }
      );
    }
  }
};
export default notificationControllerSocket;
