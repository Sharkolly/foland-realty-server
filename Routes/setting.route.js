import express from "express";
import { change_user_role_controller } from "../Controller/changeRole.controller.js";
import { setting_notification_controller } from "../mongodb/controller/getSettingsNotification.js";
import { change_user_details } from "../Controller/change_user_details.controller.js";

const router = express.Router();

// get user
router.put("/role", change_user_role_controller);

router.put("/account-info", change_user_details);

router.get("/notification", setting_notification_controller);

export default router;
