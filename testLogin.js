import fetch from "node-fetch";

const testLogin = async () => {
  const response = await fetch("http://127.0.0.1:3001/api/foland-realty/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: "lukekafidele@gmail.com",
      password: "Test@1234"  // remplace ’ par '
    })
  });

  const data = await response.json();
  console.log("Login response:", data);
};

testLogin();
