import { Schema, model } from "mongoose";

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
      required: true
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
      enum: ["For Sale", "For Rent", "Shortlet"],
      default: "For Rent",
      required: true
    },
    property: {
      type: String,
      enum: ["Land", "House", "Shop"],
      default: "House",
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
      type: String,
      required: [true, "Please provide a price"],
    },
    purpose: {
      type: String,
    },
    location: {
      type: String,
      required: [true, "Please provide the location"],
    },
    bedroom: {
      type: Number,
    },
    bathroom: {
      type: Number,
    },
    landSize: {
      type: String,
      required: true,
    },
    isLandlordLivingWithTenant: {
      type: String,
    },
    ownershipDetails: [
      {
        titleDocument: {
          type: String,
          required: true,
        },
        ownershipType: {
          type: String,
          enum: ["Leasehold", "Freehold"],
          default: "Freehold",
          required: true,
        },
        propertyID: {
          type: Number,
          required: true,
        },
      },
    ],
    edited: {
      type: Boolean,
      default: false,
    },
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);
const Property = model("Property", propertySchema);

export default Property;
