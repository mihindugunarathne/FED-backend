import { Request, Response, NextFunction } from "express";
import ForbiddenError from "../../domain/errors/forbidden-error";

export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { sessionClaims } = req.auth;
    
    // Add more detailed logging
    console.log("Full auth object:", req.auth);
    console.log("Session claims:", sessionClaims);
    console.log("Role from metadata:", sessionClaims?.metadata?.role);
    
    if (!sessionClaims?.metadata?.role || sessionClaims.metadata.role !== 'admin') {
      throw new ForbiddenError("Unauthorized: Admin access required");
    }

    next();
  } catch (error) {
    console.error("Admin authorization error:", error);
    next(error);
  }
};
