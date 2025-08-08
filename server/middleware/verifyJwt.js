import jwt from "jsonwebtoken";

const verifyJwt = (req, res, next) => {
  const token = req.cookies?.accessToken;
  if (!token) return res.status(401).json({ message: "Access token missing" });

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded; // You assign the whole decoded object to req.user
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired access token" });
  }
};

export default verifyJwt;
