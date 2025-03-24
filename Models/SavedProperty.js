import { Schema, model } from "mongoose";

const SavedPropertySchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
  property: {
    type: Schema.Types.ObjectId,
    ref: "Property",
    required: true,
  },
  savedAt: { type: Date, default: Date.now },
});

const SavedProperty = model("SavedProperty", SavedPropertySchema);

export default SavedProperty;
