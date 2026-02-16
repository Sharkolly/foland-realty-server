import { Schema, model } from "mongoose";

const transactionSchema = new Schema(
  {
    reference: { type: String, required: true, unique: true },

    type: {
      type: String,
      enum: [
        "PROPERTY_PAYMENT",
        "SUBSCRIPTION",
        "RENEWAL",
        "AGENT_FEE",
        "PAYOUT",
      ],
      required: true,
    },

    payer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    receiver: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: function () {
        return this.type === "PROPERTY_PAYMENT" || this.type === "AGENT_FEE";
      },
      default: function () {
        return this.type !== "PROPERTY_PAYMENT" && this.type !== "AGENT_FEE"
          ? "FOLAND_PAYMENT"
          : undefined;
      },
    },

    amount: { type: Number, required: true },

    status: {
      type: String,
      enum: ["PENDING", "SUCCESS", "FAILED"],
      default: "PENDING",
    },

    paymentMethod: {
      type: String,
      default: "PAYSTACK",
    },

    metadata: { type: Object },
  },
  { timestamps: true },
);

const propertyPaymentSchema = new Schema(
  {
    property: {
      type: Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },

    tenant: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: function () {
        return this.consumer === "TENANT";
      },
    },
    buyer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: function () {
        return this.consumer === "BUYER";
      },
    },

    consumer: {
      type: String,
      enum: ["TENANT", "BUYER"],
      required: true,
      default: "TENANT",
    },
    owner: {
      type: String,
      enum: ["LANDLORD", "AGENT"],
      required: true,
      default: "TENANT",
    },

    landlord: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: function () {
        return this.consumer === "LANDLORD";
      },
    },

    agent: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: function () {
        return this.consumer === "AGENT";
      },
    },

    commisson_fee: {
      type: Number,
      required: true,
    },

    transaction: {
      type: Schema.Types.ObjectId,
      ref: "Transaction",
      required: true,
    },

    rentPeriodStart: {
      type: Date,
      required: function () {
        return this.consumer === "TENANT";
      },
    },
    rentPeriodEnd: {
      type: Date,
      required: function () {
        return this.consumer === "TENANT";
      },
    },

    status: {
      type: String,
      enum: ["AWAITING_CONFIRMATION", "PAID", "RELEASED"],
      default: "AWAITING_CONFIRMATION",
    },
  },
  { timestamps: true },
);

const subscriptionSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    plan: {
      type: String,
      enum: ["BASIC", "PREMIUM", "COMFORT", "LUXURY"],
      required: true,
    },

    status: {
      type: String,
      enum: ["ACTIVE", "EXPIRED"],
      default: "ACTIVE",
    },

    nextBillingDate: Date,

    transaction: {
      type: Schema.Types.ObjectId,
      ref: "Transaction",
    },
  },
  { timestamps: true },
);

export const Subscription = model("Subscription", subscriptionSchema);

export const PropertyPayment = model("PropertyPayment", propertyPaymentSchema);

export const Transaction = model("Transaction", transactionSchema);
