import express from "express";
import upload from "../middleware/fileUpload.js";
import multer from "multer";
import addProperty from "../Controller/addProperty.controller.js";
import getProperties from "../Controller/getProperties.controller.js";
import saveProperty from "../Controller/saveProperty.controller.js";
import getSavedProperties from "../Controller/getSavedProperty.controller.js";
import getAllSavedProperties from "../Controller/getUserSavedProperties.controller.js";
import getSingleProperty from "../Controller/getSingleProperty.controller.js";

const router = express.Router();

//post property
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

//get all properties
router.get("/all-properties", getProperties);

//get saved property
router.get("/saved-property", getSavedProperties);

//get user saved properties
router.get("/user-saved-property", getAllSavedProperties);

//get single property
router.get("/:id", getSingleProperty);

//post save property
router.post("/save-property", saveProperty);


export default router;
