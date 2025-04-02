import express from 'express';
import { trackStock } from '../controllers/trackController.js';

const router = express.Router();
router.get('/:id', trackStock);
export default router;
