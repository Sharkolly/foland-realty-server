import crypto from "crypto";
import { v4 } from "uuid";
import { addPropertiesToMongoDb } from "../mongodb/controller/property.model.js";

const addProperty = async (req, res) => {
  await new Promise((res) => setTimeout(res, 3000));

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
  } = req.body;
  console.log(req.body);
  console.log(title, description, price, type, location + "Hello");
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
  }

  const images = req.files
    ? req.files.map((file) => ({
        path: `/uploads/${file.filename}`,
        hash: crypto.createHash("sha256").update(file.filename).digest("hex"),
      }))
    : null;

  const ownershipDetails = [{ titleDocument, ownershipType, propertyID }];

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
      owner
    );
    console.log(newProperty);
    res.json({ message: "Property Saved" });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};
3
export default addProperty;
