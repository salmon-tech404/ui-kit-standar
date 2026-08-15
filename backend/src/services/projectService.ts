import { Project, IProject } from '../models/Project.model.js';
import { CreateProjectInput, UpdateProjectInput } from '../schemas/project.schema.js';
import { Types } from 'mongoose';

export class ProjectService {
  /**
   * List all non-archived projects belonging strictly to the authenticated user.
   */
  public static async listProjects(userId: string): Promise<IProject[]> {
    return Project.find({ userId: new Types.ObjectId(userId), isArchived: false })
      .sort({ updatedAt: -1 })
      .lean();
  }

  /**
   * Get single project by ID with strict tenant isolation (prevents IDOR).
   */
  public static async getProjectById(userId: string, projectId: string): Promise<IProject | null> {
    return Project.findOne({
      _id: new Types.ObjectId(projectId),
      userId: new Types.ObjectId(userId),
    });
  }

  /**
   * Create a new design system project.
   */
  public static async createProject(userId: string, data: CreateProjectInput): Promise<IProject> {
    const defaultTokens = {
      foundations: {
        colors: {
          brand: { primary: '#6366F1', primaryHover: '#4F46E5', primaryFocus: '#818CF8', secondary: '#EC4899', accent: '#10B981' },
          semantic: { success: '#10B981', warning: '#F59E0B', error: '#EF4444', info: '#3B82F6' },
          neutral: { gray50: '#FAFAFA', gray100: '#F3F4F6', gray200: '#E5E7EB', gray500: '#6B7280', gray800: '#1F2937', gray900: '#111827' },
          surface: { background: '#FFFFFF', foreground: '#0F172A', surface: '#FFFFFF', border: '#E2E8F0' },
        },
        typography: { fontHeading: 'Plus Jakarta Sans', fontBody: 'Inter', fontMono: 'JetBrains Mono', baseSize: 14, scaleRatio: 1.25 },
        spacing: { base: 8, scale: [0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64] },
        radius: { base: 8, sm: 4, md: 8, lg: 12, xl: 16, full: 9999 },
        shadows: { sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', md: '0 4px 6px -1px rgba(0, 0, 0, 0.07)', lg: '0 10px 15px -3px rgba(0, 0, 0, 0.08)' },
      },
      brand: { iconLibrary: 'lucide', strokeWidth: '1.5' },
    };

    const project = new Project({
      userId: new Types.ObjectId(userId),
      name: data.name,
      description: data.description || '',
      version: '1.0.0',
      schemaVersion: '1.0.0',
      tokens: data.tokens || defaultTokens,
    });

    return project.save();
  }

  /**
   * Update project tokens & metadata with strict IDOR check.
   */
  public static async updateProject(userId: string, projectId: string, data: UpdateProjectInput): Promise<IProject | null> {
    return Project.findOneAndUpdate(
      { _id: new Types.ObjectId(projectId), userId: new Types.ObjectId(userId) },
      { $set: data },
      { new: true }
    );
  }

  /**
   * Soft-delete / archive project.
   */
  public static async deleteProject(userId: string, projectId: string): Promise<boolean> {
    const res = await Project.findOneAndUpdate(
      { _id: new Types.ObjectId(projectId), userId: new Types.ObjectId(userId) },
      { $set: { isArchived: true } }
    );
    return Boolean(res);
  }
}
