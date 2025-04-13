import Chat from "../../Models/Chat.js";

export const getUsersInChat = async (senderId, role) => {
  // const users = await Chat.find({ sender: senderId }).populate("receiver", "firstName lastNa
  // me email phoneNumber profilePicture").sort({ updatedAt: -1 });
  let users;
  console.log(role);
  if (role == "Landlord" || role == "Agent") {
    console.log(senderId);
    users = await Chat.find({ receiver: senderId }).populate("sender", "firstName lastName role image")
    .sort({ updatedAt: -1 });;
    console.log(users)
  }
   else {
    users = await Chat.find({ sender: senderId })
      .populate("receiver", "firstName lastName role image")
      .sort({ updatedAt: -1 });
  }
  return users;
};
