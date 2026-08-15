import { Request, Response, NextFunction } from 'express';
import { User } from '../models/User.model.js';

export async function exportQuotaGuard(req: Request, res: Response, next: NextFunction): Promise<void> {
  if (!req.user) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const { tier } = req.user;
  const FREE_MONTHLY_LIMIT = 10;

  if (tier === 'pro' || tier === 'enterprise') {
    return next();
  }

  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    if (user.exportCountThisMonth >= FREE_MONTHLY_LIMIT) {
      res.status(403).json({
        error: 'Export Quota Exceeded',
        message: `Free tier is limited to ${FREE_MONTHLY_LIMIT} XML exports per month. Please upgrade to Pro for unlimited downloads.`,
      });
      return;
    }

    // Increment export count
    await User.findByIdAndUpdate(req.user.userId, { $inc: { exportCountThisMonth: 1 } });
    next();
  } catch (error) {
    res.status(500).json({ error: 'Failed to verify export quota' });
  }
}
