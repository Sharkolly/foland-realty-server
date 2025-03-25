import SavedProperty from "../Models/SavedProperty.js";
import { addSavedPropertiesToMongoDb } from "../mongodb/controller/saveProperty.model.js";

const saveProperty = async (req, res) => {
  const { user } = req;
  const { propertyId } = req.body;
  //   await Property.deleteMany();
  try {
    const checkIfPropertyIsSaved = await SavedProperty.findOne({
      owner: user._id,
      property: propertyId,
    });
    if (checkIfPropertyIsSaved) {
      await SavedProperty.deleteOne({ owner: checkIfPropertyIsSaved.owner });
      return res
        .status(200)
        .json({ message: "Property unsaved", saved: false });
    } else {
      const addToDB = await addSavedPropertiesToMongoDb(user, propertyId);
      return res.status(201).json({ message: "Property Saved", saved: true });
    }
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

export default saveProperty;
