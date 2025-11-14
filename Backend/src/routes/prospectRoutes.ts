import { Router } from 'express';
import {
  getAllProspects,
  createProspect,
  getProspectById,
  updateProspect,
  deleteProspect,
} from '../controller/prospectController';
import { validateRequest } from '../middleware/validateRequest';
import { createProspectSchema, updateProspectSchema } from '../validation/prospectValidation';

const router = Router();

router.route('/')
  .get(getAllProspects)
  .post(validateRequest(createProspectSchema), createProspect);

router.route('/:id')
  .get(getProspectById)
  .put(validateRequest(updateProspectSchema), updateProspect)
  .delete(deleteProspect);

export default router;