import { Request, Response } from 'express';
import { ProjectService } from '../services/projectService.js';
import { XmlExportService } from '../services/xmlExportService.js';
import { ExportHistory } from '../models/ExportHistory.model.js';
import { Types } from 'mongoose';

export class ExportController {
  /**
   * Export Master XML Specification for AI Vibe Coding.
   */
  public static async exportXml(req: Request<{ id: string }>, res: Response): Promise<void> {
    const userId = req.user!.userId;
    const project = await ProjectService.getProjectById(userId, req.params.id);

    if (!project) {
      res.status(404).json({ error: 'Project not found' });
      return;
    }

    const xmlContent = XmlExportService.generateMasterXml({
      projectName: project.name,
      version: project.version,
      tokens: project.tokens,
    });

    // Record in export history
    await ExportHistory.create({
      userId: new Types.ObjectId(userId),
      projectId: project._id,
      format: 'xml',
      xmlVersion: project.schemaVersion || '1.0.0',
      ipAddress: req.ip,
    });

    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="${project.name.toLowerCase().replace(/\s+/g, '-')}-spec.xml"`);
    res.send(xmlContent);
  }

  /**
   * Preview XML Content (Returns JSON with XML string for in-browser viewer).
   */
  public static async previewXml(req: Request<{ id: string }>, res: Response): Promise<void> {
    const userId = req.user!.userId;
    const project = await ProjectService.getProjectById(userId, req.params.id);

    if (!project) {
      res.status(404).json({ error: 'Project not found' });
      return;
    }

    const xmlContent = XmlExportService.generateMasterXml({
      projectName: project.name,
      version: project.version,
      tokens: project.tokens,
    });

    res.json({ xml: xmlContent });
  }
}
