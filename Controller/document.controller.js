import Document from "../models/Document.js";
import cloudinary from "../config/cloudinary.config.js";

// 📁 Afficher tous les documents
export const listDocuments = async (req, res) => {
  try {
    const docs = await Document.find().sort({ createdAt: -1 });
    res.json(docs);
  } catch (error) {
    console.error("Erreur récupération documents :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// 📤 Uploader un document (via fichier ou URL directe)
export const uploadDocument = async (req, res) => {
  const { type, name, user } = req.body;
  const file = req.file;

  if (!file) {
    return res.status(400).json({ error: "Fichier requis." });
  }

  try {
    const document = await Document.create({
      user,
      name,
      type,
      fileUrl: file.path,            // URL sécurisée depuis Cloudinary
      cloudinaryId: file.filename,   // public_id de Cloudinary
    });

    res.status(201).json(document);
  } catch (error) {
    console.error("Erreur upload document :", error);
    res.status(500).json({ error: "Erreur serveur lors de l'enregistrement du document" });
  }
};


// 🗑️ Supprimer un document
export const deleteDocument = async (req, res) => {
  try {
    const doc = await Document.findById(req.params.docId);
    if (!doc) return res.status(404).json({ error: "Document introuvable" });

    if (doc.cloudinaryId) {
      await cloudinary.uploader.destroy(doc.cloudinaryId);
    }

    await doc.deleteOne();
    res.json({ message: "Document supprimé avec succès." });
  } catch (error) {
    console.error("Erreur suppression document :", error);
    res.status(500).json({ error: "Erreur serveur lors de la suppression" });
  }
};

