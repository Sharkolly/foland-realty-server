import SavedProperty from "../Models/SavedProperty.js";
import { addSavedPropertiesToMongoDb } from "../mongodb/controller/saveProperty.model.js";

const saveProperty = async (req, res) => {
  const { user } = req;
  const { propertyId } = req.body;
  // await new Promise((res,rej) => setTimeout(() => {res()}, 3000))
  //   await Property.deleteMany();
  try {
    const checkIfPropertyIsSaved = await SavedProperty.findOne({
      owner: user._id,
      property: propertyId,
    });
    if (checkIfPropertyIsSaved) {
      console.log(checkIfPropertyIsSaved);
      await SavedProperty.deleteOne({ owner: checkIfPropertyIsSaved.owner, property: checkIfPropertyIsSaved.property });
      return res
        .status(200)
        .json({ message: "Property unsaved", saved: false });
    } else {
      const addToDB = await addSavedPropertiesToMongoDb(user, propertyId);
      // console.log(addToDB);
      return res.status(201).json({ message: "Property Saved", saved: true });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message, err });
  }
};

export default saveProperty;
