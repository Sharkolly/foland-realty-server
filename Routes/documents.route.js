import express from "express";
import multer from "multer";
import storage  from "../config/cloudinary.config.js"; // ✔️ ici on récupère storage multer
import {
  listDocuments,
  uploadDocument,
  deleteDocument,
} from "../Controller/document.controller.js";
import { get_document_security } from "../Controller/get_document_security.controller.js";

const router = express.Router();
const upload = multer({ storage }); // upload vers Cloudinary

// GET tous les documents
router.get("/", listDocuments);

// POST upload vers Cloudinary
router.post("/", upload.single("file"), uploadDocument);

// DELETE supprime Cloudinary + DB
router.delete("/:docId", deleteDocument);

router.get("/security", get_document_security);


export default router;
