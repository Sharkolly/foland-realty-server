import express from "express";
import adminController from "../Controller/admin.controller.js";

const router = express.Router();

// get admin
router.get("/", adminController);

export default router;
