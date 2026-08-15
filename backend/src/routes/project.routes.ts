import { Router } from 'express';
import { ProjectController } from '../controllers/project.controller.js';
import { requireAuth } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { createProjectSchema, updateProjectSchema } from '../schemas/project.schema.js';

const router = Router();

router.use(requireAuth); // All project routes require authentication

router.get('/', ProjectController.list);
router.post('/', validate(createProjectSchema), ProjectController.create);
router.get('/:id', ProjectController.getById);
router.put('/:id', validate(updateProjectSchema), ProjectController.update);
router.delete('/:id', ProjectController.delete);

export default router;
