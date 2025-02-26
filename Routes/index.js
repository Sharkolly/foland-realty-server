const express = require("express");
const upload = require("../middleware/fileUpload");
const { login } = require("../Controller/login");
const { forgot_password } = require("../Controller/forgotPassword");
const { verify_code } = require("../Controller/verifyCode");
const { signUp } = require("../Controller/signup");
const { reset_password } = require("../Controller/resetPassword");
const { newsLetter } = require("../Controller/newsLetter");
const verifyToken = require("../middleware/tokenVerification");
const VerifyToken = require("../Controller/VerifyToken");

const router = express.Router();

// router.post("/signup", upload.single("profilePic"), signUp);

router.post("/signup", signUp);

router.post("/login", login);

router.post("/forgot-password", forgot_password);

router.post("/verify-code", verify_code);

router.post("/reset-password", reset_password);

router.post('/subscribe', newsLetter);

router.get("/token-verify", verifyToken, VerifyToken);

module.exports = { router };
