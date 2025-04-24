import { getProperties } from "../mongodb/controller/property.model.js";

const getPropertiesController = async (req, res) => {
  try {
    // get all properties
    const property = await getProperties();
    res.status(200).json({ property });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};
export default getPropertiesController;
