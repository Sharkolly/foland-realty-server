import multer from "multer";
import path from "path";
import storage from "../config/cloudinaryStorage.config.js";

// File Filter (Optional)
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|mp4|wem|png|avi|mov/;
  // get extension name from path
  const ext = path.extname(file.originalname).toLowerCase();
  const mime = file.mimetype;

  if (allowedTypes.test(ext) && allowedTypes.test(mime)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type!"), false);
  }
};

// Base multer instance
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 6 * 1024 * 1024 },
});
export default upload;
