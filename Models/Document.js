import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  type: { type: String, required: true },       // ex: 'passport', 'id_card', 'contract'...
  fileUrl: { type: String, required: true },    // URL Cloudinary
  createdAt: { type: Date, default: Date.now },
  cloudinaryId: { type: String }, // pour supprimer le fichier plus tard
});
const Document = mongoose.model("Document", documentSchema);

export default Document;

