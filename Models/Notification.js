import { model } from "mongoose";
import { Schema } from "mongoose";

const NotificationSchema = new Schema(
  {
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    //  type: {
    //   type: String,
    //   enum: ['inspection', 'message', 'all', 'system-alerts'], // customize as needed
    //   required: true,
    // },
    messages: [
      {
        roomID: { type: String, required: true },
        senderID: { type: Schema.Types.ObjectId, ref: "User", required: true },
        senderName: { type: String, required: true },
        senderAvatar: { type: String, required: false },
        message: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    inspections: [
      {
        information: { type: String, required: true },
        sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
        message: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    alerts: [
      {
        information: { type: String, required: true },
        message: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },

  { timestamps: true }
);

const Notification = model("Notification", NotificationSchema);

export default Notification;
