import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

// Nettoyage complet du token : suppression espaces, retours à la ligne
const token = process.env.USER_TEST_TOKEN?.trim().replace(/\r?\n/g, "");

if (!token) {
  console.error("❌ Aucun token valide trouvé dans USER_TEST_TOKEN");
  process.exit(1);
}

console.log("Token utilisé :", JSON.stringify(token));

async function testVerifyToken() {
  try {
    const response = await fetch("http://127.0.0.1:3001/api/foland-realty/user/profile", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    console.log("Status code:", response.status);
    const data = await response.json();
    console.log("Response:", data);
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

testVerifyToken();
