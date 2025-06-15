import { getProperties } from "../mongodb/controller/property.model.js";

const getPropertiesController = async (req, res, next) => {
  try {
    // get all properties
    const property = await getProperties();
    return res.status(200).json({ property });
  } catch (err) {
    //return res.status(500).json({ message: "Internal server error" });
    next(err);
  }
};
export default getPropertiesController;
