import { Schema, model } from "mongoose";

const messageSchema = new Schema({
  sender: { type: Schema.Types.ObjectId, ref: "User" },
  receiver: { type: Schema.Types.ObjectId, ref: "User" },
  message: String,
  timestamp: { type: Date, default: Date.now },
},{timestamps: true});

const Message = model("Message", messageSchema);

export default Message;