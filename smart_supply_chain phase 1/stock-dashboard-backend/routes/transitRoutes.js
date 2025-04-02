import express from 'express';
import { getTransitList } from '../controllers/transitController.js';

const router = express.Router();

router.get('/', getTransitList);

export default router;
