import express from "express";
import { newsLetter } from "../Controller/newsLetter.controller.js";

const router = express.Router();

router.post("/subscribe", newsLetter);

export default router;