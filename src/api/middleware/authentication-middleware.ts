import { getAuth } from "@clerk/express";
import { Request, Response, NextFunction } from "express";
import UnauthorizedError from "../../domain/errors/unauthorized-error";

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, sessionClaims } = getAuth(req);
    
    if (!userId) {
      throw new UnauthorizedError("Unauthorized");
    }

    // Add session claims to request
    req.auth = {
      userId,
      sessionClaims
    };

    next();
  } catch (error) {
    next(new UnauthorizedError("Unauthorized"));
  }
};

export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId, sessionClaims } = getAuth(req);
    
    // Check if user exists and has admin role in metadata
    if (!userId || sessionClaims?.metadata?.role !== 'admin') {
      return res.status(403).json({ 
        message: "Unauthorized: Admin access required" 
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({ 
      message: "Authentication failed" 
    });
  }
};
