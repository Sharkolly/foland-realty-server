import jwt from "jsonwebtoken";

const verifyToken = async (req, res, next) => {

  // get token
  const getToken = req.headers.authorization;
  if (!getToken) {
    return res.status(403).json({ message: "No Token Found" });
  }
  //verify token and call the next function
  jwt.verify(getToken, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: err.message });
    }
    req.user = user;
    next();
  });
};

export default verifyToken;
