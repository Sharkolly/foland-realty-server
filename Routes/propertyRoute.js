import express from "express";
import upload from "../middleware/fileUpload.js";
import multer from "multer";
import addProperty from "../Controller/addProperty.controller.js";
import getProperties from "../Controller/getProperties.controller.js";

const router = express.Router();

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
        return res.status(400).json({
          message:
            "Minimum of 3 images is required and maximum of 4 images is allowed",
        });
      }
      next();
    });
  },
  addProperty
);

router.get("/all-properties", getProperties);

export default router;
