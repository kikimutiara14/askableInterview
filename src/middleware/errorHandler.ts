import { Request, Response, NextFunction } from "express";

export function errorHandler(
  err: Error & { status?: number },
  req: Request,
  res: Response,
  next: NextFunction
) {
  // In production, log the error properly (omitted here for brevity)
  res.status(err.status || 500).json({ message: err.message || "Internal Server Error" });
}