import express from "express";
import getChatUsers from "../Controller/getChatUsers.controller.js";
import getChatUser from "../Controller/singleUserChatInfo.controller.js";

const router = express.Router();

router.get("/", getChatUsers);
router.get("/user-info/:owner/:tenant", getChatUser);

export default router;
