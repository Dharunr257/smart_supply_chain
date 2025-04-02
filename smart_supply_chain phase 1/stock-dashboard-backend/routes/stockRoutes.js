import express from 'express';
import { findStock } from '../controllers/stockController.js';

const router = express.Router();
router.get('/:id', findStock);
export default router;
