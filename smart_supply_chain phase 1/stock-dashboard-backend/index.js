import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import inventoryRoutes from './routes/inventoryRoutes.js';
import stockRoutes from './routes/stockRoutes.js';
import trackRoutes from './routes/trackRoutes.js';
import deliveredRoutes from './routes/deliveredRoutes.js';
import statsRoutes from './routes/statsRoutes.js';
import predictRoutes from './routes/predictRoutes.js';
import transitRoutes from './routes/transitRoutes.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/inventory', inventoryRoutes);
app.use('/stock', stockRoutes);
app.use('/track', trackRoutes);
app.use('/delivered', deliveredRoutes);
app.use('/stats', statsRoutes);
app.use('/predict-inventory', predictRoutes);
app.use('/api/transit', transitRoutes);

// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`backend Server running at http://localhost:${PORT}`);
});
