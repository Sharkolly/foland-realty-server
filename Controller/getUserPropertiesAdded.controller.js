import { getUserPropertiesAdded } from "../mongodb/controller/property.model.js";

const getUserPropertiesAddedController = async (req, res, next) => {
  const { user } = req;
  try {
    //get all the properties the user has added
    const getUserAddedProperties = await getUserPropertiesAdded(user);
    res.status(201).json({ properties: getUserAddedProperties });
  } catch (error) {
    // res.status(500).json({ message: error.message });
    next(error);
  }
};

export default getUserPropertiesAddedController;
