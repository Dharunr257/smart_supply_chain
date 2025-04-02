import express from 'express';
import { createProductHandler } from '../controllers/productController.js';

const router = express.Router();

router.post('/create', createProductHandler);

export default router;
