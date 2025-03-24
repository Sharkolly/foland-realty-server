import SavedProperty from "../../Models/SavedProperty.js";

export const getUserTotalSavedProperty = async (user) => {
  const userTotalProperty = await SavedProperty.countDocuments({
    owner: user._id,
  });
  const userTotalPropertes = await SavedProperty.find({ owner: user._id });
  return userTotalProperty;
};
export const getSavedProperties = async () => {
  const properties = await SavedProperty.find()
    .sort({ createdAt: -1 })
    .limit(6);
  return properties;
};

export const addSavedPropertiesToMongoDb = async (user, propertyId) => {
  const propertyDetails = {
    owner: user,
    property: propertyId,
  };

  const saveProperty = await new SavedProperty(propertyDetails);
  const newSavedProperty = await saveProperty.save();
  return newSavedProperty;
};
