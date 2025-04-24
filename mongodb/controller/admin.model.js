import Property from "../../Models/Property.js";
import User from "../../Models/User.js";
import SavedProperty from "../../Models/SavedProperty.js";

// get total users
export const getTotalUsers = async () => {
  const totalUsers = await User.countDocuments();
  return totalUsers;
};
//get total property and total property posted by each user
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

// get total savedProperty

export const getTotalSavedProperty = async () => {
  const totalSavedProperties = await SavedProperty.countDocuments();
  return totalSavedProperties;
};

// get all users and details
export const getAllUsers = async () => {
  const allUsers = await User.find().select("-password");
  return allUsers;
};

// get all users role
export const getAllUsersRole = async () => {

  // tenant
  const tenantsRole = await User.find({ role: "Tenant" })
    .sort({ createdAt: -1 })
    .limit(6);
    // total amount of tenants
  const allTotalAmountofTenantsUsers = await User.countDocuments({
    role: "Tenant",
  });

  // landlord
  const LandlordRole = await User.find({ role: "Landlord" })
    .sort({ createdAt: -1 })
    .limit(6);

    // total amount of landlords
  const allTotalAmountofLandlordUsers = await User.countDocuments({
    role: "Landlord",
  });

  // agent
  const AgentRole = await User.find({ role: "Agent" })
    .sort({ createdAt: -1 })
    .limit(6);

     // total number of agents
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

// get properties details

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

// get all properties
export const getAllProperties = async () => {
  const allProperties = await Property.find().sort({ createdAt: -1 })
  return allProperties;
};
