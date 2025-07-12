import fetch from "node-fetch";

const userId = "686a4b185af3ef8c68490a24"; // Remplace par un vrai ObjectId existant
const url = `http://localhost:3001/api/foland-realty/user/documents/${userId}`;

const test = async () => {
  const res = await fetch(url);
  const data = await res.json();

  console.log("Status:", res.status);
  console.log("Documents:", data);
};

test();
