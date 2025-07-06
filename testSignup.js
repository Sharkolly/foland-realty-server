import fetch from "node-fetch";

const testSignup = async () => {
  const response = await fetch("http://127.0.0.1:3001/api/foland-realty/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      firstName: "Fidèle",
      lastName: "Lukeka",
      email: "lukekafidele@gmail.com",
      password: "Test@1234",
      role: "Tenant"
    }),
  });

  const data = await response.json();
  console.log("Signup response:", data);
};

testSignup();
