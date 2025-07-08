import Chat from "../../Models/Chat.js";

export const getUsersInChat = async (senderId, role) => {
  let users;
  if (role == "Landlord" || role == "Agent") {
    //if landlord or agent check the chat receiver field
    users = await Chat.find({ receiver: senderId })
      .populate("sender", "firstName lastName role image")
      .sort({ updatedAt: -1 }).lean();
  } else {
    //  else check sender field
    users = await Chat.find({ sender: senderId })
      .populate("receiver", "firstName lastName role image")
      .sort({ updatedAt: -1 }).lean();
  } 
  const lastMessage = users.map((chat) => {
    const message = chat.messages || null;
    const userLastMessage = message[message.length - 1].message;
    const userLastMessageTime = message[message.length - 1].timestamp;
    return {...chat, userLastMessage, userLastMessageTime };
  });
  return lastMessage;
};