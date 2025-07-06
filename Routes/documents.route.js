import express from "express";
import multer from "multer";
import storage from "../config/cloudinary.config.js";
import {
  listDocuments,
  uploadDocument,
  deleteDocument,
} from "../Controller/document.controller.js";

const router = express.Router();
const upload = multer({ storage });

// GET /api/documents
router.get("/", listDocuments);

// POST /api/documents
router.post("/", upload.single("file"), uploadDocument);

// DELETE /api/documents/:docId
router.delete("/:docId", deleteDocument);

export default router;
