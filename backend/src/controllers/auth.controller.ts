import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User, IUser } from '../models/User.model.js';
import { RegisterInput, LoginInput } from '../schemas/auth.schema.js';

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'super_secret_access_key_change_in_production_32chars';
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'super_secret_refresh_key_change_in_production_32chars';

function generateTokens(user: IUser) {
  const accessToken = jwt.sign(
    { userId: user._id.toString(), email: user.email, tier: user.tier },
    ACCESS_SECRET,
    { expiresIn: '15m' }
  );

  const refreshToken = jwt.sign(
    { userId: user._id.toString() },
    REFRESH_SECRET,
    { expiresIn: '7d' }
  );

  return { accessToken, refreshToken };
}

function setRefreshTokenCookie(res: Response, token: string) {
  res.cookie('refreshToken', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    path: '/api/auth',
  });
}

export class AuthController {
  public static async register(req: Request<{}, {}, RegisterInput>, res: Response): Promise<void> {
    const { email, password, name } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(409).json({ error: 'Email is already registered' });
      return;
    }

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = new User({
      email,
      passwordHash,
      name,
      tier: 'free',
      credits: 50,
      exportCountThisMonth: 0,
      refreshTokens: [],
    });

    const { accessToken, refreshToken } = generateTokens(user);
    user.refreshTokens.push(refreshToken);
    await user.save();

    setRefreshTokenCookie(res, refreshToken);

    res.status(201).json({
      accessToken,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        tier: user.tier,
        credits: user.credits,
      },
    });
  }

  public static async login(req: Request<{}, {}, LoginInput>, res: Response): Promise<void> {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ error: 'Invalid email or password' });
      return;
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      res.status(401).json({ error: 'Invalid email or password' });
      return;
    }

    const { accessToken, refreshToken } = generateTokens(user);
    
    // Refresh token rotation
    user.refreshTokens.push(refreshToken);
    if (user.refreshTokens.length > 5) user.refreshTokens.shift();
    await user.save();

    setRefreshTokenCookie(res, refreshToken);

    res.json({
      accessToken,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        tier: user.tier,
        credits: user.credits,
      },
    });
  }

  public static async refreshToken(req: Request, res: Response): Promise<void> {
    const incomingToken = req.cookies?.refreshToken;

    if (!incomingToken) {
      res.status(401).json({ error: 'No refresh token provided in secure cookie' });
      return;
    }

    try {
      const decoded = jwt.verify(incomingToken, REFRESH_SECRET) as { userId: string };
      const user = await User.findById(decoded.userId);

      if (!user || !user.refreshTokens.includes(incomingToken)) {
        // Potential Token Reuse Attack - revoke all refresh tokens
        if (user) {
          user.refreshTokens = [];
          await user.save();
        }
        res.clearCookie('refreshToken', { path: '/api/auth' });
        res.status(403).json({ error: 'Invalid or reused refresh token. Please login again.' });
        return;
      }

      // Rotate Refresh Token
      const { accessToken, refreshToken: newRefreshToken } = generateTokens(user);
      user.refreshTokens = user.refreshTokens.filter((t) => t !== incomingToken);
      user.refreshTokens.push(newRefreshToken);
      await user.save();

      setRefreshTokenCookie(res, newRefreshToken);

      res.json({
        accessToken,
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          tier: user.tier,
          credits: user.credits,
        },
      });
    } catch (err) {
      res.clearCookie('refreshToken', { path: '/api/auth' });
      res.status(401).json({ error: 'Refresh token expired or invalid' });
    }
  }

  public static async logout(req: Request, res: Response): Promise<void> {
    const token = req.cookies?.refreshToken;
    if (token) {
      try {
        const decoded = jwt.verify(token, REFRESH_SECRET) as { userId: string };
        await User.findByIdAndUpdate(decoded.userId, { $pull: { refreshTokens: token } });
      } catch (e) {}
    }

    res.clearCookie('refreshToken', { path: '/api/auth' });
    res.json({ message: 'Logged out successfully' });
  }

  public static async getMe(req: Request, res: Response): Promise<void> {
    if (!req.user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const user = await User.findById(req.user.userId).select('-passwordHash -refreshTokens');
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    res.json({ user });
  }
}
