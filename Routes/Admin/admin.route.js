import express from "express";
import { adminLogin } from "../../Controller/Admin/login.contoller.js";
import verifyToken from "../../middleware/tokenVerification.js";
import VerifyToken from "../../Controller/VerifyToken.controller.js";

const router = express.Router();

router.post("/login", adminLogin);

router.get("/token-verify", verifyToken, VerifyToken);

export default router;
