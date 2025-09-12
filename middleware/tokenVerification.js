import jwt from "jsonwebtoken";

const tokenVerification = (req, res, next) => {
  // 1. Récupérer le token dans l’en-tête Authorization : "Bearer <token>" ou dans les cookies
  const authHeader = req.headers.authorization;
  console.log("token:", authHeader);
  const cookieToken = req.cookies?.token;

  let token = null;

  if (authHeader) {
    token = authHeader; // extraire le token depuis le header
  } else if (cookieToken) {
    token = cookieToken; // ou depuis les cookies
  }

  if (!token) {
    return res.status(403).json({ message: "No Token Found" });
  }

  jwt.verify(authHeader, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: err.message });

    req.user = user;
    next();
  });
};

export default tokenVerification;


