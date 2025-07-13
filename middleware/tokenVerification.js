import jwt from "jsonwebtoken";

const verifyToken = async (req, res, next) => {


  const {token} = req.cookies; 
  console.log(token);  
  // get token
  if (!token) {
    return res.status(403).json({ message: "No Token Found" });
  }
  //verify token and call the next function
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: err.message });
    }
    req.user = user;
    next();
  });
};

export default verifyToken;
