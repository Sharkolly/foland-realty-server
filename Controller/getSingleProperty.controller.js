import { getSingleProperty } from "../mongodb/controller/property.model.js";

const getSinglePropertyController = async (req, res) => {
  const { id } = req.params;
  try {
    const property = await getSingleProperty(id);
    res.status(200).json({ property });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};
export default getSinglePropertyController;
