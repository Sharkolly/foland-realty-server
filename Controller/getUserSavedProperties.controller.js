import { getUserSavedProperties } from "../mongodb/controller/saveProperty.model.js";

const getAllSavedPropertiesController = async (req, res, next) => {
  const { user } = req;
  try {
    // get all the saved property a user has saved
    const userSavedProperties = await getUserSavedProperties(user);
    res.status(200).json({ userSavedProperties });
  } catch (err) {
    next(err);
  }
};
export default getAllSavedPropertiesController;
