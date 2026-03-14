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
export const getProperties = async (page, limit = 6) => {
  const skip = (page - 1) * limit;
  const total = await Property.countDocuments();

  const property = await Property.aggregate([
    { $sample: { size: total } },

    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "owner",
      },
    },

    { $unwind: "$owner" },

    {
      $project: {
        title: 1,
        price: 1,
        description: 1,
        property: 1,
        propertyType: 1,
        state: 1,
        images: 1,
        purpose: 1,
        location: 1,
        bedroom: 1,
        bathroom: 1,
        landSize: 1,
        createdAt: 1,
        "owner.firstName": 1,
        "owner.lastName": 1,
        "owner.role": 1,
        "owner.profile_picture": 1,
        "owner.isOnline": 1,
        "owner.verified": 1,
      },
    },

    { $skip: skip },
    { $limit: limit },
  ]);  

  const hasMore = skip + property.length < total;

  return { property, total, hasMore };
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
  purpose,
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
  const getProperty = await Property.findOne({ _id: propertyId }).populate(
    "owner",
    "firstName lastName role profile_picture isOnline verified",
  );
  return getProperty;
};
