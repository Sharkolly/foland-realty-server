const { Schema, model } = require("mongoose");

const propertySchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title"],
    },
    description: {
      type: String,
      required: [true, "Enter a description"],
    },
    propertyType: {
      type: String,
      enum: ["Land", "House", "Rent"],
      default: "Rent",
    },
    images: [
      {
        path: { type: String, required: true },
        hash: { type: String, required: true, unique: true },
        uploadedAt: { type: Date, default: Date.now },
      },
    ],
    price: {
      type: Number,
      required: [true, "Please provide a password"],
    },
    location: {
      type: String,
      required: [true, "Please provide the location"],
    },
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);
const Property = model("Property", propertySchema);

module.exports = Property;
