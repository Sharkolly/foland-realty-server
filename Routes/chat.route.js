import express from "express";
import getChatUsers from "../Controller/getChatUsers.controller.js";
import getChatUser from "../Controller/singleUserChatInfo.controller.js";

const router = express.Router();

// get request for all the chat the user has made
router.get("/", getChatUsers);

//get request for a single user the user want to chat with
router.get("/user-info/:owner/:tenant", getChatUser);

export default router;
