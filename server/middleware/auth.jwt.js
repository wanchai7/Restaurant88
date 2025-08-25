import jwt from "jsonwebtoken";
import authConfig from "../config/auth.config";

const verifyToken = (req, res, next) => {
  let token = req.headers["x-acces-token"];
  if (!token) {
    return res.status(403).send({ message: "No Token Provided!" });
  }
  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized" });
    }
    req.username = decoded.username;
    next();
  });
};
const authJwt = { verifyToken };
export default authJwt;
