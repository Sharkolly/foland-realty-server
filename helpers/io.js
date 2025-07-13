import { Server } from "socket.io";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import Chat from "../Models/Chat.js";
import User from "../Models/User.js";
import Notification from "../Models/Notification.js";
import notificationControllerSocket from "../Controller/io/notifications.io.controller.js";
import {
  addChatToDB,
  getAllMessages,
  updateChat,
} from "../Controller/io/updateChat.io.controller.js";
import logger from "../config/logger.js";

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: ["http://localhost:3000", "https://foland-realty.vercel.app"],
      credentials: true,
    },
  });

  io.use(async (socket, next) => {
    //get token
    const rawCookie = socket.handshake.headers.cookie;

    if (!rawCookie) {
      return next(new Error("No cookie found"));
    }

    const parsed = cookie.parse(rawCookie);
    const token = parsed.token;

    if (!token) {
      logger.warn("No token provided, disconnecting socket");
      return socket.disconnect(true);
    }
    try {
      // verify token
      const verifyUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const getUser = await User.findById(verifyUser._id);
      socket.user = getUser;

      // call the next function
      next();
    } catch (error) {
      logger.error(error);
    }
  });

  const connectedUsers = new Map();
  // On the socket
  io.on("connection", async (socket) => {
    //join the room emit

    connectedUsers.set(socket.user._id, socket.id);
    await User.findByIdAndUpdate(socket.user._id, { isOnline: true });
    socket.broadcast.emit("user-online", socket.user._id, connectedUsers);

    socket.on("join-room", async (data, cb) => {
      let chatDetails;
      const { room, propertyId, receiver } = data;

      if (socket.user.role === "Tenant") {
        chatDetails = {
          roomId: room,
          sender: socket.user._id,
          propertyId,
          receiver,
        };
      }

      try {
        // join room
        socket.join(room);

        //get all the message in the room
        const getAllMsg = await Chat.findOne({ roomId: room });

        // send all the messages in the db to the room on the frontend
        io.to(room).emit("get-all-message", getAllMsg, { id: socket.id });
        // send a notification for new message
        io.to(room).emit("notification", socket.id);
      } catch (err) {
        logger.error(err);
      }
    });

    socket.on("send-message", async (message, data) => {
      let chatDetails;
      const { room, propertyId, receiver, userID, userName, sender } = data;
      if (socket.user.role === "Tenant") {
        chatDetails = {
          roomId: room,
          sender: socket.user._id,
          propertyId,
          receiver,
        };
      }
      // check if room exists
      const checkIfRoomExists = await Chat.findOne({ roomId: room });
      if (!checkIfRoomExists) {
        // add the chatDetails  to db
        await addChatToDB(chatDetails);
      }
      if (room) {
        // if room exists update the particular room with the new message
        await updateChat(room, socket, message);

        let owner;
        if (socket.user.role === "Tenant") {
          owner = receiver;
        } else {
          owner = sender;
        }

        const messageNotificationDetails = {
          senderName: userName,
          senderID: userID,
          roomID: room,
          message,
          senderAvatar: "",
        };
        const notif = await Notification.findOne({ owner });

        // add the message to the Notification or update the message if it exists
        await notificationControllerSocket(
          notif,
          messageNotificationDetails,
          owner,
          userID,
          message
        );

        // find a particular room to display the message
        const getAllMessage = await getAllMessages(room);

        //send all the message with the message again to the frontend
        io.to(room).emit("get-all-message", getAllMessage, {
          id: socket.id,
          message,
        });
      } else {
        // io.emit("sent-message",  upDate);
        io.emit("sent-message", { message: data, id: socket.id });
      }
    });

    // disconnect the socket
    socket.on("disconnect", async () => {
      logger.info("Socket disconnected:", socket.id);
      await User.findByIdAndUpdate(socket.user._id, {
        isOnline: false,
        lastSeen: new Date(),
      });
    });
    socket.broadcast.emit("user-offline", socket.user._id);
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};
