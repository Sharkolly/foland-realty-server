const { Schema, model } = require("mongoose");

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a title"],
  },
  description: {
    type: String,
    required: [true, 'Enter a description'],
  },
  propertyType: {
    type: String,
    enum: ['Land', 'House', 'Rent'],
    default: 'Rent'
  },
  price: {
    type: Number,
    required: [true, "Please provide a password"],
  },
  location: {
    type: String,
    required: [true, "Please provide the location"],
  },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});
const Property = model("Property", propertySchema);

module.exports = Property;