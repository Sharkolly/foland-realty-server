import { getUsersInChat } from "../mongodb/controller/getChatUsers.model.js";

const getChatUsers = async (req, res) => {
  const { user } = req;  

  try {
    //get all the users in the user has chatted with
    const users = await getUsersInChat(user._id, user.role);
    if (!users) {
      return res.status(201).json({ message: "No chat found" });
    }
    // console.log(users);
    res.status(201).json(users);
  } catch (error) {
    console.log(error);
  }
};

export default getChatUsers;
