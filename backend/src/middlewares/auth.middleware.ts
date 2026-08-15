import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserTier } from '../models/User.model.js';

export interface AuthenticatedUser {
  userId: string;
  email: string;
  tier: UserTier;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
    }
  }
}

export function requireAuth(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Unauthorized: Missing or invalid Authorization header' });
    return;
  }

  const token = authHeader.split(' ')[1];
  const secret = process.env.JWT_ACCESS_SECRET || 'super_secret_access_key_change_in_production_32chars';

  try {
    const decoded = jwt.verify(token, secret) as AuthenticatedUser;
    req.user = {
      userId: decoded.userId,
      email: decoded.email,
      tier: decoded.tier,
    };
    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized: Access token expired or invalid' });
  }
}
