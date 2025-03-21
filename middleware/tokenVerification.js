import jwt from "jsonwebtoken";

const verifyToken = async (req, res, next) => {
  const getToken = req.headers.authorization;
  if (!getToken) {
    return res.status(403).json({ message: "No Token Found" });
  }
  jwt.verify(getToken, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(201).json({ message: err.message }).status(403);
    }
    req.user = user;
  });
  next();
};

export default verifyToken;
