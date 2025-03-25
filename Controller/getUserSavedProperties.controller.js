import { getUserSavedProperties } from "../mongodb/controller/saveProperty.model.js";

const getAllSavedPropertiesController = async (req, res) => {
  const { user } = req;
  try {
    const userSavedProperties = await getUserSavedProperties(user);
    res.status(200).json({ userSavedProperties });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};
export default getAllSavedPropertiesController;
