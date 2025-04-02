import express from 'express';
import {
  getInventoryStats,
  getTransitStats,
  getDeliveredStats
} from '../controllers/statsController.js';

const router = express.Router();

router.get('/inventory', getInventoryStats);
router.get('/transit', getTransitStats);
router.get('/delivered', getDeliveredStats);

export default router;
