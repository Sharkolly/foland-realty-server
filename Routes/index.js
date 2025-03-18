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
const addProperty = require("../Controller/addProperty");
const multer = require('multer');

const router = express.Router();

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

module.exports = { router };
