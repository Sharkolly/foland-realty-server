import { Schema, model } from "mongoose";

const deviceSchema = new Schema({
  deviceId: { type: String, required: true }, // e.g., UUID or generated token
  deviceType: { type: String, required: true }, // 'mobile', 'desktop', etc.
  browser: String,
  os: String,
  ipAddress: String,
  location: {
    country: String,
    country_code: String,
    timezone: String,
    mobile_network: String,
    utc: String,
    calling_code: String,
    ip: String,
    network: String,
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
    reset_code: {
      type: String,
    },
    changed_role: {
      type: String,
      default: false,
    },
    phone: {
      type: String,
    },
    // idDocument: [idDocumentSchema],
    id_document: [
      {
        name: { type: String },
        path: { type: String },
      },
      { timestamps: true },
    ],
    device: [deviceSchema],
    reset_code_expiration: { type: Date },
  },
  { timestamps: true }
);

const User = model("User", userDetails);

export default User;
