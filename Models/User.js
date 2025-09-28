import { Schema, model } from "mongoose";

const deviceSchema = new Schema({
  deviceId: { type: String, required: true }, // e.g., UUID or generated token
  deviceType: { type: String, required: true }, // 'mobile', 'desktop', etc.
  browser: String,
  os: String,
  ipAddress: String,
  location: {
    country: String,
    region: String,
    city: String,
    latitude: Number,
    longitude: Number,
  },
  lastLogin: { type: Date, default: Date.now },
});

// const idDocumentSchema = new Schema(
//   {
//     name: { type: String },
//     path: { type: String },
//     uploadedAt: { type: Date, default: Date.now },
//   },
//   { _id: false }
// );

const userDetails = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please provide a First name"],
      unique: false,
    },
    isOnline: Boolean,
    lastSeen: Date,
    uuid: {
      type: String,
    },
    lastName: {
      type: String,
      required: [true, "Please provide a Last name"],
      unique: false,
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: [true, "Email already exists"],
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
    changedRole: {
      type: String,
      default: false,
    },
    phone: {
      required: true,
      type: String,
    },
    // idDocument: [idDocumentSchema],
    idDocument: [
      {
        name: { type: String },
        path: { type: String },
      },
      {timestamps: true},
    ],
    device: [deviceSchema],
    resetCodeExpiration: { type: Date },
  },
  { timestamps: true }
);

const User = model("User", userDetails);

export default User;
