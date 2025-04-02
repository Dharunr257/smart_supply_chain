import express from 'express';
import { getDeliveredStocks } from '../controllers/deliveredController.js';

const router = express.Router();
router.get('/', getDeliveredStocks);
export default router;
