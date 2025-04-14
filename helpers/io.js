import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import Chat from "../Models/Chat.js";
import User from "../Models/User.js";

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: [
        "http://localhost:5173",
        "http://localhost:5174",
        "https://foland-realty.vercel.app",
      ],
      // credentials: true,
    },
  });

  io.use(async (socket, next) => {
    const token = socket.handshake.auth.token;

    if (!token) {
      console.log("No token provided, disconnecting socket");
      return socket.disconnect(true); // Force disconnect
    }
    try {
      const verifyUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const getUser = await User.findById(verifyUser._id);
      socket.user = getUser;

      next();
    } catch (error) {
      console.log(error);
    }
  });

  io.on("connection", (socket) => {
    console.log("Me" + " " + socket.id);

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
        socket.join(room);
        console.log(`User joined room: ${room}`);

        cb(`You opened a chat with ${room}`);

        const getAllMsg = await Chat.findOne({ roomId: room });

        io.to(room).emit("get-all-message", getAllMsg, {id: socket.id } );

        io.to(room).emit("notification", socket.id);

      } catch (err) {
        console.log( err);
      }
    });

    socket.on("send-message", async (message, data) => {
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
      const checkIfRoomExists = await Chat.findOne({ roomId: room });
      if (!checkIfRoomExists) {
        const addChatToDb = await new Chat(chatDetails);
        const saveDb = await addChatToDb.save();
      }
      if (room) {
        const updateMessage = await Chat.findOneAndUpdate(
          { roomId: room },
          {
            $push: {
              messages: {
                senderId: socket.user._id,
                message,
              },
            },
          },
          { new: true, upsert: true }
        );

        const getAllMessage = await Chat.findOne({ roomId: room });
        io.to(room).emit("get-all-message", getAllMessage, {id: socket.id, message });
      } else {
        // io.emit("sent-message",  upDate);
        io.emit("sent-message", { message: data, id: socket.id });
      }
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};
