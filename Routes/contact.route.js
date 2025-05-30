import express from "express";
import contactMessage from "../Controller/contact-message.controller.js";

const router = express.Router();

// get request for all the chat the user has made
router.post("/message", contactMessage);

export default router;
