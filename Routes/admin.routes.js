import express from "express";
import adminController from "../Controller/admin.controller.js";

const router = express.Router();

router.get("/", adminController);

export default router;
