import Chat from "../../Models/Chat.js";

export const updateChat = async (room, socket, message) => {
  const updateMessage = await Chat.findOneAndUpdate(
    { roomId: room },
    // push to the message array
    {
      $push: {
        messages: {
          senderId: socket.user._id,
          message,
        },
      },
    },
    { new: true, upsert: true }
  );
};

export const getAllMessages = async (room) => {
  const allMessage = await Chat.findOne({ roomId: room });
  return allMessage;
};

export const addChatToDB = async (chatDetails) => {
  const addChatToDB = await new Chat(chatDetails);
  const saveDb = await addChatToDB.save();
};
