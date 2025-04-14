import Chat from "../../Models/Chat.js";
import Property from "../../Models/Property.js";

export const getUserInChat = async (senderId, role, roomId, owner) => {
  let user;
  let firstTime;
  const checkIfRoomExist = await Chat.findOne({ roomId });
  if (checkIfRoomExist) {
    if (role == "Landlord" || role == "Agent") {
      // console.log(senderId);
      user = await Chat.findOne({ receiver: senderId, roomId })
        .populate("sender", "firstName lastName role image")
        .sort({ updatedAt: -1 });
        firstTime = false;
    } else {
      user = await Chat.findOne({ sender: senderId, roomId })
        .populate("receiver", "firstName lastName role image")
        .sort({ updatedAt: -1 });
        firstTime = false;
    }

  } else {
    user = await Property.findOne({ owner }).select('owner').populate(
      "owner",
      "firstName lastName role image"
    );
    firstTime = true;
  }
  console.log(user);
  return {user, firstTime};
};
