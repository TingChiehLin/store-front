import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();
const { TOKEN_SECRET } = process.env;

const verifyAuthToken = (req: Request, res: Response, next: Function) => {
  const authorizationHeader = req.headers.authorization;
  const token = authorizationHeader?.split(" ")[1];
  if (!token) {
    return res.status(401).send("Access denied. Token missing.");
  }

  try {
    jwt.verify(token, TOKEN_SECRET as string);
    next();
  } catch (err) {
    res.status(400).send("Invalid token");
    return;
  }
};

export default verifyAuthToken;