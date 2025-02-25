const { Schema, model } = require("mongoose");

const messageSchema = new Schema({
  sender: { type: Schema.Types.ObjectId, ref: "User" },
  receiver: { type: Schema.Types.ObjectId, ref: "User" },
  message: String,
  timestamp: { type: Date, default: Date.now },
},{timestamps: true});

const Message = model("Message", messageSchema);

module.exports = Message;