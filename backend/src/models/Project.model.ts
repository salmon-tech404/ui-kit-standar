import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IProject extends Document {
  userId: Types.ObjectId;
  name: string;
  description?: string;
  version: string;
  schemaVersion: string;
  tokens: Record<string, any>;
  isArchived: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 500,
      default: '',
    },
    version: {
      type: String,
      default: '1.0.0',
    },
    schemaVersion: {
      type: String,
      default: '1.0.0',
    },
    tokens: {
      type: Schema.Types.Mixed,
      required: true,
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Compound Indexes for fast queries & strict IDOR protection
ProjectSchema.index({ userId: 1, updatedAt: -1 });
ProjectSchema.index({ userId: 1, _id: 1 });

export const Project = mongoose.model<IProject>('Project', ProjectSchema);
