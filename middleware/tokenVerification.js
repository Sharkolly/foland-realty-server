const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const getToken = req.headers.authorization;
  if (!getToken) res.json({ message: "No Token Found" }).status(403);
  jwt.verify(getToken, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) res.json({ message: err.message }).status(403);
    req.user = user;
  });
  next();
};

module.exports = verifyToken;
