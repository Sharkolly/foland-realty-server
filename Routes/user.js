import express from "express";
import { getUser } from "../Controller/user.controller.js";

const router = express.Router();

router.get("/user", getUser);

export default router;
