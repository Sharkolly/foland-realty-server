const express = require("express");
const upload = require("../middleware/fileUpload");
const {signUp} = require('../Controller/auth');
const verifyToken = require("../middleware/tokenVerification");
const VerifyToken = require('../Controller/VerifyToken');


const router = express.Router();

router.post("/login", upload.single("profilePic"), signUp);
router.get("/token-verify",verifyToken, VerifyToken);

module.exports = { router };