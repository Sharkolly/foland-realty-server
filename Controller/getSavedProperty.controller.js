import { getSavedProperties } from "../mongodb/controller/saveProperty.model.js";

const getSavedPropertiesController = async (req, res) => {
  try {
    const savedProperties = await getSavedProperties();
    res.status(200).json({ savedProperties });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};
export default getSavedPropertiesController;