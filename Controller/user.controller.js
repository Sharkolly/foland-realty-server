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
    const userProfile = await getUserMongoDb(user);
    if (!userProfile) {
      res.status(403).json({ message: "User not found" });
    }
    const userTotalProperty = await getUserTotalProperty(user);
    const userSavedProperty = await getUserSavedProperties(user);
    console.log(userSavedProperty);
    const userSavedTotalProperty = await getUserTotalSavedProperty(user);
    res
      .status(200)
      .json({
        userProfile,
        userTotalProperty,
        userSavedTotalProperty,
        userSavedProperty,
      });
  } catch (err) {
    console.log(err.message);
  }
};
