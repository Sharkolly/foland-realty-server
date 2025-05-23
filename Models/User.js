import { Schema, model } from "mongoose";

const userDetails = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please provide a username"],
      unique: false,
    },

    uuid: {
      type: String,
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
      default: "Tenant",
    },
    resetCode: {
      type: String,
    },
    resetCodeExpiration: { type: Date },
  },
  { timestamps: true }
);

const User = model("User", userDetails);

export default User;
