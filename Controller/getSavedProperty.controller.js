import { getSavedProperties } from "../mongodb/controller/saveProperty.model.js";

const getSavedPropertiesController = async (req, res, next) => {
  try {
    //get all saved properties
    const savedProperties = await getSavedProperties();
    return res.status(200).json({ savedProperties });
  } catch (err) {
  //  return res.status(500).json({ message: "Internal server error" });
    next(err);
  }
};
export default getSavedPropertiesController;