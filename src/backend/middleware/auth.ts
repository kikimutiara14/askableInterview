import { Request, Response, NextFunction } from "express";

const AUTH_USER = process.env.API_USER || "admin";
const AUTH_PASS = process.env.API_PASS || "password";

export function basicAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Basic ")) {
    return res.status(401).json({ message: "Authorization required" });
  }
  const credentials = Buffer.from(authHeader.split(" ")[1], "base64").toString().split(":");
  if (credentials[0] !== AUTH_USER || credentials[1] !== AUTH_PASS) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  return next();
}