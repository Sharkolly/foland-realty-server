import Property from "../../Models/Property.js";


export const getUserTotalProperty = async (user) => {
  const userTotalProperty = await Property.countDocuments({ owner: user._id });
  const userTotalPropertes = await Property.find({ owner: user._id });
  console.log(userTotalPropertes);
  return userTotalProperty;
};

export const addPropertiesToMongoDb= async (
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
  owner
) => {
  const propertyDetails = {
    uuid,
    title,
    description,
    price: priceOfProperty,
    type,
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
  };

  const saveProperty = await new Property(propertyDetails);
  const newProperty = await saveProperty.save();
  return newProperty;
};
