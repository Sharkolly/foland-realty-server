const { Schema, model } = require("mongoose");

const imageSchema = new Schema(
  {
    path: { type: String, required: true },
    hash: { type: String, required: true, unique: true },
    uploadedAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const propertySchema = new Schema(
  {
    uuid: {
      type: String,
    },
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
      enum: ["For Sale", "For Rent"],
      default: "For Rent",
    },
    property: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: [true, "Please provide a state"],
    },
    images: {
      type: [imageSchema], // Array of image objects
      validate: {
        validator: function (val) {
          return val.length <= 4;
        },
        message: "You can only upload up to 4 images",
      },
    },
    price: {
      type: Number,
      required: [true, "Please provide a price"],
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
