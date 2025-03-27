import { getUserPropertiesAdded } from "../mongodb/controller/property.model.js";

const getUserPropertiesAddedController = async (req, res) => {
  const { user } = req;
  try {
    const getUserAddedProperties = await getUserPropertiesAdded(user);
    res.status(201).json({ properties: getUserAddedProperties });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default getUserPropertiesAddedController;
