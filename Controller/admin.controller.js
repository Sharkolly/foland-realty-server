import {
  getAllUsers,
  getTotalSavedProperty,
  getTotalUsers,
  getTotalProperty,
  getAllUsersRole,
  getPropertiesDetails,
  getAllProperties
} from "../mongodb/controller/admin.model.js";

const adminController = async (req, res) => {
  try {
    const getAllUSers = await getTotalUsers();
    const getAllProperty = await getTotalProperty();
    const getAllSavedProperty = await getTotalSavedProperty();
    const getAllUser = await getAllUsers();
    const getAllUsersRoles = await getAllUsersRole();
    const getAllPropertiesDetails = await getPropertiesDetails();
    const allProperties = await getAllProperties()

    res.status(201).json({
      getAllUSers,
      getAllProperty,
      getAllSavedProperty,
      getAllUser,
      getAllUsersRoles,
      getAllPropertiesDetails,
      allProperties
    });
  } catch (error) {
    res.status(403).json({ message: "Server Error" });
  }
};

export default adminController;
