import { getUsersInChat } from "../mongodb/controller/getChatUsers.model.js";

const getChatUsers = async (req, res, next) => {
  const { user } = req;  

  try {
    //get all the users in the user has chatted with
    const users = await getUsersInChat(user._id, user.role);
    if (!users) {
      return res.status(201).json({ message: "No chat found" });
    }
    // console.log(users);
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export default getChatUsers;
