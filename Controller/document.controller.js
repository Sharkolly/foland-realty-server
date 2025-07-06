import Document from "../models/Document.js";
import cloudinary from "../config/cloudinary.config.js";

export const listDocuments = async (req, res) => {
  try {
    const docs = await Document.find({}).sort({ createdAt: -1 });
    res.json(docs);
  } catch (error) {
    console.error("Error listing documents:", error);
    res.status(500).json({ error: "Erreur serveur lors de la récupération des documents" });
  }
};

export const uploadDocument = async (req, res) => {
  const { type, name, fileUrl } = req.body;
  const file = req.file;

  if (!file && !fileUrl) {
    return res.status(400).json({ error: "Fichier requis (upload ou URL)." });
  }

  try {
    const document = await Document.create({
      name,
      type,
      fileUrl: file ? file.path : fileUrl,
    });

    res.status(201).json(document);
  } catch (error) {
    console.error("Error uploading document:", error);
    res.status(500).json({ error: "Erreur serveur lors de l'enregistrement du document" });
  }
};


export const deleteDocument = async (req, res) => {
  try {
    const doc = await Document.findById(req.params.docId);
    if (!doc) return res.status(404).json({ error: "Document introuvable" });

    // extraction publicId pour cloudinary (attention à adapter selon ton dossier et nommage)
    const publicId = doc.fileUrl.split("/").pop().split(".")[0];

    await cloudinary.uploader.destroy(`documents/${publicId}`);
    await doc.deleteOne();

    res.json({ message: "Document supprimé avec succès." });
  } catch (error) {
    console.error("Error deleting document:", error);
    res.status(500).json({ error: "Erreur serveur lors de la suppression du document" });
  }
};
