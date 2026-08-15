import mongoose, { Schema, Document } from 'mongoose';

export type UserTier = 'free' | 'pro' | 'enterprise';

export interface IUser extends Document {
  email: string;
  passwordHash: string;
  name: string;
  tier: UserTier;
  credits: number;
  exportCountThisMonth: number;
  refreshTokens: string[];
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    tier: {
      type: String,
      enum: ['free', 'pro', 'enterprise'],
      default: 'free',
    },
    credits: {
      type: Number,
      default: 50,
      min: 0,
    },
    exportCountThisMonth: {
      type: Number,
      default: 0,
    },
    refreshTokens: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model<IUser>('User', UserSchema);
