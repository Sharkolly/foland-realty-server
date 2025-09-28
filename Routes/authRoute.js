import express from "express";

import { login } from "../Controller/login.controller.js";
import { forgot_password } from "../Controller/forgotPassword.controller.js";
import { verify_code } from "../Controller/verifyCode.controller.js";
import { signUp } from "../Controller/signup.controller.js";
import { reset_password } from "../Controller/resetPassword.controller.js";
import { newsLetter } from "../Controller/newsLetter.controller.js";
import verifyToken from "../middleware/tokenVerification.js";
import VerifyToken from "../Controller/VerifyToken.controller.js";
import { logOut } from "../Controller/logOut.controller.js";
import  { uploadIdDocument } from "../middleware/fileUpload.js";
import { captureDevice } from "../middleware/user_device.js";

const router = express.Router();

// router.post("/signup", upload.single("profilePic"), signUp);

// router.post(
//   "/signup",
//   (req, res, next) => {
//     upload.single("idDocument")(req, res, (err) => {
//       if (err instanceof multer.MulterError) {
//         return res.status(400).json({ message: err.message });
//       } else if (err) {
//         return res.status(400).json({ message: err.message });
//       }
//       next();
//     });
//   },
//   signUp
// );
router.post(
  "/signup",
    uploadIdDocument.single("idDocument"),
  signUp
);

router.post("/login", captureDevice, login);

router.post("/forgot-password", forgot_password);

router.post("/verify-code", verify_code);

router.post("/reset-password", reset_password);

router.get("/token-verify", verifyToken, VerifyToken);

router.get("/logout", logOut);

export default router;
