import { getProperties } from "../mongodb/controller/property.model.js";

const getPropertiesController = async (req, res) => {
  try {
    const property = await getProperties();
    res.status(200).json({ property });
  } catch (err) {
    console.log(err.message);
  }
};
export default getPropertiesController;
