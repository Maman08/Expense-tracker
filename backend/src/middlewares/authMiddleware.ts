import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const authMiddleware = (req: any, res: any, next: NextFunction) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
 console.log(token)
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");
    console.log("Decoded Token:",decoded); 
    req.user = decoded;
    
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};
