import { getSingleProperty } from "../mongodb/controller/property.model.js";

const getSinglePropertyController = async (req, res, next) => {
  const { id } = req.params;
  try {
    //get a single property 
    const property = await getSingleProperty(id);
    return res.status(200).json({ property });
  } catch (err) {
    // return res.status(500).json({ message: "Internal server error" });
    next(err);
  }
};
export default getSinglePropertyController;
