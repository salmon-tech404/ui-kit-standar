import { Request, Response, NextFunction } from 'express';
import { User } from '../models/User.model.js';

export async function creditGuard(req: Request, res: Response, next: NextFunction): Promise<void> {
  if (!req.user) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  try {
    // Atomic deduction: only decrement if credits > 0
    const user = await User.findOneAndUpdate(
      { _id: req.user.userId, credits: { $gt: 0 } },
      { $inc: { credits: -1 } },
      { new: true }
    );

    if (!user) {
      res.status(403).json({
        error: 'Insufficient Credits',
        message: 'You have 0 AI generation credits remaining. Please upgrade your plan.',
      });
      return;
    }

    next();
  } catch (error) {
    console.error('CreditGuard Error:', error);
    res.status(500).json({ error: 'Failed to process AI credits' });
  }
}
