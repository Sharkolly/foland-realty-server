import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

// ✅ Remplace par ton vrai userId MongoDB et vérifie que c’est bien une chaîne de 24 caractères
const userId = "686a4b185af3ef8c68490a24";

// ✅ Récupère le token proprement depuis .env
const token = process.env.USER_TEST_TOKEN?.trim().replace(/\n/g, "");

if (!token) {
  console.error("❌ Aucun token JWT trouvé dans .env");
  process.exit(1);
}

const url = `http://localhost:3001/api/foland-realty/user/documents/${userId}`;

async function testDocuments() {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    console.log("Status Code:", response.status);
    const data = await response.json();
    console.log("Response:", data);
  } catch (error) {
    console.error("Erreur lors de la requête :", error);
  }
}

testDocuments();
