import SavedProperty from "../Models/SavedProperty.js";
import Property from "../Models/Property.js";
import { addSavedPropertiesToMongoDb } from "../mongodb/controller/saveProperty.model.js";

const saveProperty = async (req, res) => {
  const { user } = req;
  const { propertyId } = req.body;
  //   await Property.deleteMany();
  try {
    // const checkIfPropertyIsSaved = await SavedProperty.findOne({
    //   owner: user._id,
    //   property: propertyId,
    // });
    // if (checkIfPropertyIsSaved) {
    //   await SavedProperty.deleteOne({ owner: checkIfPropertyIsSaved._id });
    //   return res
    //     .status(200)
    //     .json({ message: "Property unsaved", saved: false });
    // }

    // const addToDB = await addSavedPropertiesToMongoDb(user, propertyId);

    const property = await Property.findById({ _id: propertyId });
    if (!property)
      return res.status(404).json({ message: "Property not found" });

    const isSaved = property.saved === true ? true : false;
    if (isSaved) {
      property.saved = false;
      await property.save();
      return res
        .status(200)
        .json({ message: "Property unsaved", saved: false });
    } else {
      property.saved = true;
      await property.save();
      return res.status(201).json({ message: "Property Saved", saved: false });
    }
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

export default saveProperty;
