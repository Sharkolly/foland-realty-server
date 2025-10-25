import { getUserInChat } from "../mongodb/controller/singleUserChatInfo.model.js";

const getChatUser = async (req, res, next) => {
  const { user } = req;
  const {owner, tenant} = req.params;
  const room = `${owner}/${tenant}`

  try {
    // get a single chat of person
    const userInfo = await getUserInChat(user._id, user.role, room, owner);
    if (!userInfo) {
      return res.status(404).json({ message: "No chat found" });
    }
   return res.status(201).json(userInfo);
  } catch (error) {
    // res.status(502).json({ message: error.message });
    next(error);
  }
};

export default getChatUser;
