import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IExportHistory extends Document {
  userId: Types.ObjectId;
  projectId: Types.ObjectId;
  format: 'xml' | 'css' | 'json';
  xmlVersion: string;
  ipAddress?: string;
  downloadedAt: Date;
}

const ExportHistorySchema = new Schema<IExportHistory>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    projectId: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
      index: true,
    },
    format: {
      type: String,
      enum: ['xml', 'css', 'json'],
      required: true,
    },
    xmlVersion: {
      type: String,
      default: '1.0.0',
    },
    ipAddress: {
      type: String,
    },
    downloadedAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  {
    timestamps: false,
  }
);

ExportHistorySchema.index({ userId: 1, downloadedAt: -1 });

export const ExportHistory = mongoose.model<IExportHistory>('ExportHistory', ExportHistorySchema);
