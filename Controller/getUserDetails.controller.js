import {
  getUserSavedProperties,
  getUserTotalSavedProperty,
} from "../mongodb/controller/saveProperty.model.js";
import {
    getUserMongoDb,
  getUserTotalProperty,
} from "../mongodb/controller/user.model.js";

export const getUserDetailsController = async (req, res, next) => {
  const { user } = req;
  try {
// check for user profile
    const userProfile = await getUserMongoDb(user);

    if (!userProfile) res.status(403).json({ message: "User not found" });
    //get total property of user
    const userTotalProperty = await getUserTotalProperty(user);
    //get saved properties of user
    const userSavedProperty = await getUserSavedProperties(user);
    //get total amount of saved property of user
    const userSavedTotalProperty = await getUserTotalSavedProperty(user);
    return res.status(200).json({
      userProfile,
      userTotalProperty,
      userSavedTotalProperty,
      userSavedProperty,
    });
  } catch (err) {
    console.log(err.message);
    next(err)
  }
};
