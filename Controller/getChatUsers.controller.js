import { getUsersInChat } from "../mongodb/controller/getChatUsers.model.js";

const getChatUsers = async (req, res) => {
  const { user } = req;
  console.log(user);

  try {
    const users = await getUsersInChat(user._id, user.role);
    if (!users) {
      return res.status(404).json({ message: "No chat found" });
    }
    // console.log(users);
    res.status(201).json(users);
  } catch (error) {
    console.log(error);
  }
};

export default getChatUsers;
