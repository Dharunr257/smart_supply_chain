import express from 'express';
import { updateProductStatusHandler } from '../controllers/statusController.js';

const router = express.Router();

router.post('/update-status', updateProductStatusHandler);

export default router;
