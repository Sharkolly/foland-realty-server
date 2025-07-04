import { Server } from "socket.io";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import Chat from "../Models/Chat.js";
import User from "../Models/User.js";

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: [
        "http://localhost:5173",
        "http://localhost:3000",
        "https://foland-realty.vercel.app",
        "https://foland-realty-nextjs.vercel.app",
      ],
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
      console.log("No token provided, disconnecting socket");
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
      console.log(error);
    }
  });

  // On the socket
  io.on("connection", (socket) => {
    console.log("Me" + " " + socket.id);

    //join the room emit
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
        console.log(`User joined room: ${room}`);
        // callback function usefull for notification
        cb(`You opened a chat with ${room}`);
        //get all the message in the room
        const getAllMsg = await Chat.findOne({ roomId: room });

        // send all the messages in the db to the room in the frontend
        io.to(room).emit("get-all-message", getAllMsg, { id: socket.id });

        // send a notification for new message
        io.to(room).emit("notification", socket.id);
      } catch (err) {
        console.log(err);
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
      // check if room exists
      const checkIfRoomExists = await Chat.findOne({ roomId: room });
      if (!checkIfRoomExists) {
        // add the chatDetails  to db
        const addChatToDb = await new Chat(chatDetails);
        const saveDb = await addChatToDb.save();
      }
      if (room) {
        // if room exists update the particular room with the new message
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

        // find a particular room to display the message
        const getAllMessage = await Chat.findOne({ roomId: room });
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
