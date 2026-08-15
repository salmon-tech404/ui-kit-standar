import { Request, Response } from 'express';
import { ProjectService } from '../services/projectService.js';
import { CreateProjectInput, UpdateProjectInput } from '../schemas/project.schema.js';

export class ProjectController {
  public static async list(req: Request, res: Response): Promise<void> {
    const userId = req.user!.userId;
    const projects = await ProjectService.listProjects(userId);
    res.json({ projects });
  }

  public static async getById(req: Request<{ id: string }>, res: Response): Promise<void> {
    const userId = req.user!.userId;
    const project = await ProjectService.getProjectById(userId, req.params.id);

    if (!project) {
      res.status(404).json({ error: 'Project not found' });
      return;
    }

    res.json({ project });
  }

  public static async create(req: Request<{}, {}, CreateProjectInput>, res: Response): Promise<void> {
    const userId = req.user!.userId;
    const project = await ProjectService.createProject(userId, req.body);
    res.status(201).json({ project });
  }

  public static async update(req: Request<{ id: string }, {}, UpdateProjectInput>, res: Response): Promise<void> {
    const userId = req.user!.userId;
    const project = await ProjectService.updateProject(userId, req.params.id, req.body);

    if (!project) {
      res.status(404).json({ error: 'Project not found or unauthorized' });
      return;
    }

    res.json({ project });
  }

  public static async delete(req: Request<{ id: string }>, res: Response): Promise<void> {
    const userId = req.user!.userId;
    const success = await ProjectService.deleteProject(userId, req.params.id);

    if (!success) {
      res.status(404).json({ error: 'Project not found or unauthorized' });
      return;
    }

    res.json({ message: 'Project deleted successfully' });
  }
}
