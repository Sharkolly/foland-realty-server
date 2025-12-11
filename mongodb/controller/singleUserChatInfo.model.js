import Chat from "../../Models/Chat.js";
import Property from "../../Models/Property.js";

export const getUserInChat = async (senderId, role, roomId, owner) => {
  let user;
  let firstTime;
  const checkIfRoomExist = await Chat.findOne({ roomId });
  if (checkIfRoomExist) {
    // if room exist then send the existing chat else thats the first time send the owner of the property back
    if (role == "Landlord" || role == "Agent") {
      //if landlord or agent check the chat receiver else check sender
      user = await Chat.findOne({ receiver: senderId, roomId })
        .populate("sender", "firstName lastName role profile_picture isOnline verified")
        .sort({ updatedAt: -1 });
      firstTime = false;
    } else {
      user = await Chat.findOne({ sender: senderId, roomId })
        .populate(
          "receiver",
          "firstName lastName role profile_picture isOnline verified"
        )
        .sort({ updatedAt: -1 });
      firstTime = false;
    }
  } else {
    user = await Property.findOne({ owner })
      .select("owner")
      .populate("owner", "firstName lastName role profile_picture isOnline verified");
    firstTime = true;
  }
  return { user, firstTime };
};
