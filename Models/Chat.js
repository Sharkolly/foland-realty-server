// models/ChatRoom.ts
import { Schema, model } from "mongoose";

const messageSchema = new Schema({
  senderId: String,
  message: String,
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const chatRoomSchema = new Schema(
  {
    roomId: { type: String, unique: true, required: true },
    propertyId: String,
    sender: { type: Schema.Types.ObjectId, ref: "User" }, // tenants
    receiver: String, // landlord || agent,
    receiverName: String,
    messages: [messageSchema],
  },
  { timestamps: true }
);

const Chat = model("Chat", chatRoomSchema);
export default Chat;
