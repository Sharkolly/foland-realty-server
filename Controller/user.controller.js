import {
  getUserSavedProperties,
  getUserTotalSavedProperty,
} from "../mongodb/controller/saveProperty.model.js";
import {
  getUserMongoDb,
  getUserTotalProperty,
} from "../mongodb/controller/user.model.js";

export const getUser = async (req, res) => {
  const { user } = req;
  try {

    // get the user profile, i used the for the context api
    const userProfile = await getUserMongoDb(user);

    if (!userProfile) {
      res.status(403).json({ message: "User not found" });
    }

    res.status(200).json({
      userProfile,
      // userTotalProperty,
      // userSavedTotalProperty,
      // userSavedProperty,
    });
  } catch (err) {
    console.log(err.message);
  }
};
