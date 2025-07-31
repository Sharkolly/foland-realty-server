import express from "express";
import getAllNotification from "../Controller/getAllNotification.controller.js";
import getInspectionsNotification from "../Controller/getInspectionsNotifications.conroller.js";
import getAlertNotification from "../Controller/getSystemAlerts.controller.js";
import getMessageNotification from "../Controller/getMessageNotifications.controller.js";
import DeleteMessageNotificationController from "../Controller/deleteMessageNotification.controller.js";
import { deleteNotificationController } from "../Controller/deleteNotification.controller.js";

const router = express.Router();

// get all notifications
router.get("/all", getAllNotification);

// remove a notification from all notifications
router.put("/all/:id/:type", deleteNotificationController);

// get all messages
router.get("/messages", getMessageNotification);

// remove message
router.put("/message/:id", DeleteMessageNotificationController);

// get all inspections
router.get("/inspections", getInspectionsNotification);

// get all system alerts
router.get("/system-alerts", getAlertNotification);

export default router;
