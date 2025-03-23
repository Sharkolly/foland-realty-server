import express from "express";

import { login } from "../Controller/login.controller.js";
import { forgot_password } from "../Controller/forgotPassword.controller.js";
import { verify_code } from "../Controller/verifyCode.controller.js";
import { signUp } from "../Controller/signup.controller.js";
import { reset_password } from "../Controller/resetPassword.controller.js";
import { newsLetter } from "../Controller/newsLetter.controller.js";
import verifyToken from "../middleware/tokenVerification.js";
import VerifyToken from "../Controller/VerifyToken.controller.js";

 const router = express.Router();

// router.post("/signup", upload.single("profilePic"), signUp);

router.post("/signup", signUp);

router.post("/login", login);

router.post("/forgot-password", forgot_password);

router.post("/verify-code", verify_code);

router.post("/reset-password", reset_password);

router.post("/subscribe", newsLetter);

router.get("/token-verify", verifyToken, VerifyToken);


export default router;