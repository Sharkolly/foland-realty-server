import express from "express";
import { getUser } from "../Controller/user.controller.js";
import { getUserDetailsController } from "../Controller/getUserDetails.controller.js";

const router = express.Router();

// get user
router.get("/", getUser);

// get user details 
router.get('/user-details', getUserDetailsController)

export default router;
