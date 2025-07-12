import fetch from "node-fetch";
import FormData from "form-data";
import fs from "fs";

const userId = "686a4b185af3ef8c68490a24"; // Remplace par ton ObjectId réel

const form = new FormData();
form.append("name", "CV de test");
form.append("type", "pdf");
form.append("file", fs.createReadStream("./cv-test.pdf")); // fichier local

const res = await fetch(`http://localhost:3001/api/foland-realty/user/documents/${userId}`, {
  method: "POST",
  body: form,
  headers: form.getHeaders(),
});

const data = await res.json();
console.log("Upload status:", res.status);
console.log("Document uploaded:", data);
