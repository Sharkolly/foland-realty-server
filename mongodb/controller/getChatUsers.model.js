import Chat from "../../Models/Chat.js";

export const getUsersInChat = async (senderId, role) => {
  let users;
  if (role == "Landlord" || role == "Agent") {
    //if landlord or agent check the chat receiver else check sender
    users = await Chat.find({ receiver: senderId }).populate("sender", "firstName lastName role image")
    .sort({ updatedAt: -1 });
  }
   else {
    users = await Chat.find({ sender: senderId })
      .populate("receiver", "firstName lastName role image")
      .sort({ updatedAt: -1 });
  }
  return users;
};
