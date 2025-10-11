import multer from "multer";
import path from "path";
import {
  propertyPictureStorage,
  chatStorage,
  propertyVideoStorage,
  profileStorage,
  idDocumentStorage,
} from "../config/cloudinaryStorage.config.js";

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
export const uploadPropertyPicture = multer({
  storage: propertyPictureStorage,
  fileFilter,
  limits: { fileSize: 6 * 1024 * 1024 },
});
export const uploadPropertyVideo = multer({
  storage: propertyVideoStorage,
  fileFilter,
  limits: { fileSize: 6 * 1024 * 1024 },
});
export const uploadIdDocument = multer({
  storage: idDocumentStorage,
  fileFilter,
  limits: { fileSize: 6 * 1024 * 1024 },
});
export const uploadProfilePicture = multer({
  storage: profileStorage,
  fileFilter,
  limits: { fileSize: 6 * 1024 * 1024 },
});
export const uploadChat = multer({
  storage: chatStorage,
  fileFilter,
  limits: { fileSize: 6 * 1024 * 1024 },
});
