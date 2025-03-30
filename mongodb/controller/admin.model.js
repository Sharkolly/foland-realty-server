import Property from "../../Models/Property.js";
import User from "../../Models/User.js";
import SavedProperty from "../../Models/SavedProperty.js";

export const getTotalUsers = async () => {
  const totalUsers = await User.countDocuments();
  return totalUsers;
};
export const getTotalProperty = async () => {
  const totalProperties = await Property.countDocuments();
  const userTotalProperty = await Property.aggregate([
    {
      $group: {
        _id: "$owner", // Group by owner
        totalProperties: { $sum: 1 }, // Count number of properties
      },
    },
    {
      $sort: { totalProperties: -1 }, // Optional: Sort by highest property count
    },
  ]);
  return { totalProperties, userTotalProperty};
};
export const getTotalSavedProperty = async () => {
  const totalSavedProperties = await SavedProperty.countDocuments();
  return totalSavedProperties;
};
export const getAllUsers = async () => {
  const allUsers = await User.find().select("-password");
  return allUsers;
};
export const getAllUsersRole = async () => {
  const tenantsRole = await User.find({ role: "Tenant" })
    .sort({ createdAt: -1 })
    .limit(6);
  const allTotalAmountofTenantsUsers = await User.countDocuments({
    role: "Tenant",
  });
  const LandlordRole = await User.find({ role: "Landlord" })
    .sort({ createdAt: -1 })
    .limit(6);
  const allTotalAmountofLandlordUsers = await User.countDocuments({
    role: "Landlord",
  });
  const AgentRole = await User.find({ role: "Agent" })
    .sort({ createdAt: -1 })
    .limit(6);
  const allTotalAmountofAgentUsers = await User.countDocuments({
    role: "Agent",
  });

  const allRole = {
    allTenants: tenantsRole,
    totalTenants: allTotalAmountofTenantsUsers,
    allLandlord: LandlordRole,
    totalLandLord: allTotalAmountofLandlordUsers,
    allAgent: AgentRole,
    totalAgent: allTotalAmountofAgentUsers,
  };
  return allRole;
};

export const getPropertiesDetails = async () => {
  const totalAmountofRentedHouses = await User.countDocuments({
    property: "House",
    propertyType: "For Rent",
  });
  const totalAmountofHousesForSale = await User.countDocuments({
    property: "House",
    propertyType: "For Sale",
  });
  const totalAmountofRentedLands = await User.countDocuments({
    property: "Land",
    propertyType: "For Rent",
  });
  const totalAmountofLandsForSale = await User.countDocuments({
    property: "Land",
    propertyType: "For Sale",
  });

  const returnObject = {
    totalAmountofRentedHouses,
    totalAmountofHousesForSale,
    totalAmountofRentedLands,
    totalAmountofLandsForSale,
  };

  return returnObject;
};

export const getAllProperties = async () => {
  const allProperties = await Property.find().sort({ createdAt: -1 })
  return allProperties;
};
