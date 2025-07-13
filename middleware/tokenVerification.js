import jwt from "jsonwebtoken";

const tokenVerification = (req, res, next) => {
  // 1. Récupérer le token dans l’en-tête Authorization : "Bearer <token>"
  const authHeader = req.headers.authorization;

<<<<<<< HEAD
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
=======

  const {token} = req.cookies; 
  console.log(token);  
  // get token
  if (!token) {
>>>>>>> 2ead1c2f2df4798d949e43c09a78057e6fcb10a4
    return res.status(403).json({ message: "No Token Found" });
  }

  const token = authHeader.split(" ")[1]; // extraire le token

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: err.message });

    req.user = user;
    next();
  });
};

export default tokenVerification;
