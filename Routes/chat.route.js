import express from "express";
import getChatUsers from "../Controller/getChatUsers.controller.js";

const router = express.Router();

router.get("/", getChatUsers);

export default router;
