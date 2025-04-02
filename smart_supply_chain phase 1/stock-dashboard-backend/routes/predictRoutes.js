import express from 'express';
import { getInventoryPrediction } from '../controllers/predictController.js';

const router = express.Router();
router.get('/', getInventoryPrediction);

export default router;
