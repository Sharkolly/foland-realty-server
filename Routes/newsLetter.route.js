import express from "express";
import { newsLetter } from "../Controller/newsLetter.controller.js";

const router = express.Router();

router.post("/", newsLetter);

export default router;