import SavedProperty from "../../Models/SavedProperty.js";

// get user total saved property
export const getUserTotalSavedProperty = async (user) => {
  const userTotalProperty = await SavedProperty.countDocuments({
    owner: user._id,
  });
  const userTotalPropertes = await SavedProperty.find({ owner: user._id });

  return userTotalProperty;
};


// get all saved Properties
export const getSavedProperties = async () => {
  const savedProperties = await SavedProperty.find()
  // .sort({ createdAt: -1 });
  // .sort({ createdAt: -1 })
  // .limit(6);
  return savedProperties;
};

// get user saved Properties
export const getUserSavedProperties = async (user) => {
  const userSavedProperties = await SavedProperty.find({
    owner: user._id,
  })
    .populate("property")
    .sort({ createdAt: -1 });
  // .sort({ createdAt: -1 })
  // .limit(6);
  return userSavedProperties;
};

// get user saved properties with details
export const getUserSavedPropertiesWithFewDetails = async (user) => {
  const userSavedProperties = await SavedProperty.find({
    owner: user._id,
  })
    .populate("property")
    .sort({ createdAt: -1 }).exec();
  // .sort({ createdAt: -1 })
  // .limit(6);
  return userSavedProperties;
};

// save property
export const addSavedPropertiesToMongoDb = async (user, propertyId) => {
  const propertyDetails = {
    owner: user,
    property: propertyId,
  };
  const saveProperty = await new SavedProperty(propertyDetails);
  const newSavedProperty = await saveProperty.save();
  return newSavedProperty;
};
