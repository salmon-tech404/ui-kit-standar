import { Router } from 'express';
import { ExportController } from '../controllers/export.controller.js';
import { requireAuth } from '../middlewares/auth.middleware.js';
import { exportQuotaGuard } from '../middlewares/exportQuotaGuard.middleware.js';

const router = Router();

router.use(requireAuth);

router.get('/preview/:id', ExportController.previewXml);
router.get('/download/:id', exportQuotaGuard, ExportController.exportXml);

export default router;
