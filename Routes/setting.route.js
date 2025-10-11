import express from "express";
import { change_user_role_controller } from "../Controller/changeRole.controller.js";
import { setting_notification_controller } from "../mongodb/controller/getSettingsNotification.js";
import { change_user_details } from "../Controller/change_user_details.controller.js";
import { change_user_profile_picture } from "../Controller/change_user_profile_picture.controller.js";
import {uploadProfilePicture} from '../middleware/fileUpload.js'

const router = express.Router();

// get user
router.put("/role", change_user_role_controller);

router.put("/account-info",
  uploadProfilePicture.single("profileImage")
  
  
  ,change_user_details);

router.put(
  "/account-info-profile-picture",
  uploadProfilePicture.single("profileImage"),
  change_user_profile_picture
);
// router.put("/account-info",upload() ,change_user_details);

router.get("/notification", setting_notification_controller);

export default router;
