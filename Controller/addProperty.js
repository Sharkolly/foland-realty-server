const crypto = require("crypto");
const Property = require("../Models/Property");
const { v4: uuidv4 } = require("uuid");

const addProperty = async (req, res) => {
  const { title, description, price, type, location,property, state, lga } = req.body;
  console.log(property);
  if (
    !title ||
    !description ||
    !price ||
    !type ||
    !location ||
    !state ||
    !lga || 
    !property
  ) {
    return res.status(400).json({ message: "Please fill all fields" });
  }

  const images = req.files
    ? req.files.map((file) => ({
        path: `/uploads/${file.filename}`,
        hash: crypto.createHash("sha256").update(file.filename).digest("hex"),
      }))
    : null;

  if (images === null) {
    return res.status(400).json({ message: "Please add the images" });
  }

  try {
    const propertyDetails = {
      uuid: uuidv4(),
      title,
      description,
      price: parseInt(price),
      type,
      location,
      state,
      lga,
      images,
      property
    };

    const saveProperty = await new Property(propertyDetails);
    const newProperty = await saveProperty.save();
    console.log(newProperty);

    res.json({ message: "Property Saved" });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = addProperty;
