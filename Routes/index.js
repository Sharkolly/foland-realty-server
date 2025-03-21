import express from "express";
import upload from "../middleware/fileUpload.js";
import { login } from "../Controller/login.controller.js";
import { forgot_password } from "../Controller/forgotPassword.controller.js";
import { verify_code } from "../Controller/verifyCode.controller.js";
import { signUp } from "../Controller/signup.controller.js";
import { reset_password } from "../Controller/resetPassword.controller.js";
import { newsLetter } from "../Controller/newsLetter.controller.js";
import verifyToken from "../middleware/tokenVerification.js";
import VerifyToken from "../Controller/VerifyToken.controller.js";
import addProperty from "../Controller/addProperty.controller.js";
import multer from 'multer';

export const router = express.Router();

// router.post("/signup", upload.single("profilePic"), signUp);

router.post("/signup", signUp);

router.post("/login", login);

router.post("/forgot-password", forgot_password);

router.post("/verify-code", verify_code);

router.post("/reset-password", reset_password);

router.post("/subscribe", newsLetter);

router.post(
  "/add-property",
  (req, res, next) => {
    upload.array("images", 4)(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        // if (err.code === "LIMIT_UNEXPECTED_FILE") {
        //   return res
        //     .status(400)
        //     .json({ message: "You can only upload up to 4 images." });
        // }
        return res.status(400).json({ message: err.message });
      } else if (err) {
        return res.status(400).json({ message: err.message });
      }

      // Check for minimum of 3 files
      if (!req.files || req.files.length < 3) {
        return res
          .status(400)
          .json({ message: "Minimum of 3 images is required and maximum of 4 images is allowed" });
      }

      next();
    });
  },
  addProperty
);

router.get("/token-verify", verifyToken, VerifyToken);

