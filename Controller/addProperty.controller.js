import { v4 } from "uuid";
import { addPropertiesToMongoDb } from "../mongodb/controller/property.model.js";

const addProperty = async (req, res, next) => {
// get user details from middleware
  const { user } = req;
  const owner = user._id;
  const {
    title,
    description,
    price,
    type,
    location,
    property,
    state,
    lga,
    bathroom,
    bedroom,
    landSize,
    titleDocument,
    ownershipType,
    propertyID,
    isLandlordLivingWithTenant,
    purpose,
  } = req.body;
  if (
    !title ||
    !description ||
    !price ||
    !type ||
    !location ||
    !state ||
    !lga ||
    !property ||
    !landSize ||
    !titleDocument ||
    !ownershipType ||
    !propertyID
  ) {
    return res.status(400).json({ message: "Please fill all fields" });
  };

  // push the images to one array then adding the path and hashname
  const images = req.files
    ? req.files.map((file) => ({
        path: file.path,
        hash: file.filename,
      }))
    : [];
  const ownershipDetails = [{ titleDocument, ownershipType, propertyID }];

  // give each property UUID
  const uuid = v4();

  try {
    const landsize = `${landSize}sqm`;
    const priceOfProperty = `#${parseInt(price).toLocaleString()}`;
    const newProperty = await addPropertiesToMongoDb(
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
    );
    return res.status(201).json({ message: "Property Saved" });
  } catch (error) {
    next(error)
  }
};
export default addProperty;
