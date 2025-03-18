const crypto = require("crypto");
const Property = require("../Models/Property");
const { v4: uuidv4 } = require("uuid");

const addProperty = async (req, res) => {

await new Promise((res) => setTimeout(res, 3000));

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

  try {
    const propertyDetails = {
      uuid: uuidv4(),
      title,
      description,
      price: `#${parseInt(price).toLocaleString()}`,
      type,
      location,
      state,
      lga,
      images,
      property,
      landSize: `${landSize}sqm`,
      titleDocument,
      ownershipDetails,
      propertyID,
      bathroom,
      bedroom,
    };

    const saveProperty = await new Property(propertyDetails);
    const newProperty = await saveProperty.save();
    console.log(newProperty);

    res.json({ message: "Property Saved" });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = addProperty;
