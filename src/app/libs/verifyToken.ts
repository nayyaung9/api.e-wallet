import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
const CONFIG = require("../../config/db");

interface StringValidator {
  userId: string;
  email: string;
}

function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token: string = req.headers["x-access-token"] as string;
  if (!token)
    return res.status(403).send({ auth: false, message: "No token provided." });

  jwt.verify(token, CONFIG.jwtSecret, function (err: any, decoded: any) {
    if (err) {
      return res
        .status(500)
        .json({ auth: false, message: "Failed to authenticate token." });
    }
    let req: { [s: string]: StringValidator } = {};

    let credentials = decodedCredentials(decoded);
    req["credentials"] = credentials;

    next();
  });
}

function decodedCredentials(decoded: any) {
  let credentials = decoded.credentials.split(`.${CONFIG.jwtSecret}.`);
  let userId: string = credentials[0];
  let email: string = credentials[1];
  return {
    userId,
    email,
  };
}

export default verifyToken;
