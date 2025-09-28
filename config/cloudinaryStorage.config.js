// config/cloudinaryStorage.js
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary.config.js";

// configure cloudinary store
export const propertyPictureStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "foland-realty-property-picture", // Name of folder in Cloudinary
    resource_type: "auto",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});
export const propertyVideoStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "foland-realty-property-video", // Name of folder in Cloudinary
    resource_type: "auto",
    allowed_formats: ["mp4", "webm", "mov", "avi"],
  },
});
export const idDocumentStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "foland-realty-id-document", // Name of folder in Cloudinary
    resource_type: "auto",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});
export const profileStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "foland-realty-profile", // Name of folder in Cloudinary
    resource_type: "auto",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

export const chatStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "foland-realty-chat", // Name of folder in Cloudinary
    resource_type: "auto",
    allowed_formats: ["jpg", "jpeg", "png", "webp", "mp4", "webm", "mov", "avi"],
  },
});
