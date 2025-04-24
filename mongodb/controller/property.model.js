import Property from "../../Models/Property.js";

// get user total property
export const getUserTotalProperty = async (user) => {
  const userTotalProperty = await Property.countDocuments({ owner: user._id });
  return userTotalProperty;
};

// get user properties that user added
export const getUserPropertiesAdded = async (user) => {  
  const userTotalPropertes = await Property.find({ owner: user._id });
  return userTotalPropertes;
};

// get all properties
export const getProperties = async () => {
  const properties = await Property.find().sort({ createdAt: -1 }).limit(10);
  return properties;
};

export const addPropertiesToMongoDb = async (
  uuid,
  title,
  description,
  priceOfProperty,
  type,
  location,
  state,
  lga,
  images,
  property,
  landsize,
  titleDocument,
  ownershipDetails,
  propertyID,
  bathroom,
  bedroom,
  owner,
  isLandlordLivingWithTenant,
  purpose
) => {
  const propertyDetails = {
    uuid,
    title,
    description,
    price: priceOfProperty,
    propertyType: type,
    location,
    state,
    lga,
    images,
    property,
    landSize: landsize,
    titleDocument,
    ownershipDetails,
    propertyID,
    bathroom,
    bedroom,
    owner,
    isLandlordLivingWithTenant,
    purpose,
  };
// add to db
  const saveProperty = await new Property(propertyDetails);
  const newProperty = await saveProperty.save();
  return newProperty;
};


// get single property
export const getSingleProperty = async (propertyId) => {
  const getProperty = await Property.findOne({ _id: propertyId });
  return getProperty;
};
