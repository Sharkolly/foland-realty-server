import { Schema, model } from "mongoose";

const settingSchema = new Schema(
  {
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    notifications: {
      email_alerts: { type: Boolean, default: true },
      message_notifications: { type: Boolean, default: true },
      inspection_reminders: { type: Boolean, default: false },
      promotion_news: { type: Boolean, default: false },
    },
    subscriptions: {
      plan: { type: String, default: "Free" },
      listing_used: { type: Number, default: 0 },
      listing_limit: { type: Number, default: 1 },
      expiry_date: { type: Date, default: null },
      status: { type: String, default: "Inactive" },

      billing_history: [
        {
          plan: String,
          amount: Number,
          date: { type: Date, default: Date.now },
          status: String,
        },
      ],
    },
  },
  { timestamps: true }
);

const Setting = model("Setting", settingSchema);

export default Setting;
