import jwt from "jsonwebtoken";
import authConfig from "../config/auth.config";
import db from "../models/index";
const User = db.User;

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

const isAdmin = (rq, res, next) => {
  User.fireByPk(req.username).then((user) => {
    user.getRoles().then((roles) => {
      for(let i=0; i<roles.length; i++){
        if(roles[i].name === "admin"){
          next();
          return;
        }
      }
      return res.status(401).send({message:"Unauthorized access, requre addmin roles!"});
    })
  })
}

const authJwt = { verifyToken };
export default authJwt;
