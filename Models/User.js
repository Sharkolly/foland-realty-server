const { Schema, model } = require("mongoose");

const userDetails = new Schema({
  firstName: {
    type: String,
    required: [true, "Please provide a username"],
    unique: false,
  },
  lastName: {
    type: String,
    required: [true, "Please provide a username"],
    unique: false,
  },
  email: {
    type: String,
    required: [true, "Please provide a username"],
    unique: [true, "Username already exists"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  image: {
    type: String,
    unique: false,
  },
  role: {
    type: String,
    enum: ["Tenant", "Landlord", "Agent"],
    default: "tenant",
  },
  resetCode: {
    type: String,
  },
  resetCodeExpiration: { type: Date },
});

const User = model("User", userDetails);

module.exports = User;
