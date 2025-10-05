import { Schema, model } from "mongoose";

const deviceSchema = new Schema({
  deviceId: { type: String, required: true }, // e.g., UUID or generated token
  deviceType: { type: String, required: true }, // 'mobile', 'desktop', etc.
  browser: String,
  model: String,
  vendor: String,
  os: String,
  ipAddress: String,
  location: {
    country: String,
    continent: String,
    country_code: String,
    timezone: String,
    mobile_network: String,
    utc: String,
    calling_code: String,
    ip: String,
    region: String,
    city: String,
    latitude: Number,
    longitude: Number,
  },
  lastLogin: { type: Date, default: Date.now },
});

const userDetails = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please provide a First name"],
      unique: false,
    },
    gender: String,
    date_of_birth: String,
    address: String,
    isOnline: Boolean,
    lastSeen: Date,
    uuid: String,
    verified: Boolean,
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
    profile_picture: {
      type: String,
      unique: false,
    },
    role: {
      type: String,
      enum: ["Tenant", "Landlord", "Agent"],
      default: "Tenant",
    },
    reset_code: String,
    changed_role: {
      type: Boolean,
      default: false,
    },
    phone: String,
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
