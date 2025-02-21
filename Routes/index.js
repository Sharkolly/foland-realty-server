const express = require("express");
const upload = require("../middleware/fileUpload");
const { signUp, login } = require("../Controller/auth");
const verifyToken = require("../middleware/tokenVerification");
const VerifyToken = require("../Controller/VerifyToken");

const router = express.Router();

// router.post("/signup", upload.single("profilePic"), signUp);
router.post("/signup", signUp);
router.post("/login", login);
router.get("/token-verify", verifyToken, VerifyToken);

module.exports = { router };
