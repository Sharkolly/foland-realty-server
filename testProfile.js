import fetch from "node-fetch";

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODZhNGIxODVhZjNlZjhjNjg0OTBhMjQiLCJyb2xlIjoiVGVuYW50IiwiaWF0IjoxNzUxNzk2NTA0LCJleHAiOjE3NTIwNTU3MDR9.xy4Qin7Bdra_IVJ-cRXftravxrGmQL9pkd1cKhSRWc8";  // Mets ici ton token JWT valide

const testProfile = async () => {
  const response = await fetch("http://127.0.0.1:3001/api/foland-realty/user/profile", {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });

  const data = await response.json();
  console.log("Profile response:", data);
};

testProfile();
