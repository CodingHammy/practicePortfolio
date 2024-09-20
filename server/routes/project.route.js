import express from 'express';

import {
  addNewProject,
  deleteOneProject,
  getAllProjects,
  updateOneProject,
} from '../controllers/project.controller.js';

const router = express.Router();

router.get('/', getAllProjects);
router.post('/', addNewProject);
router.put('/:id', updateOneProject);
router.delete('/:id', deleteOneProject);

export default router;
