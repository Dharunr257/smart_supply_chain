import { exec } from 'child_process';
import path from 'path';

export const getInventoryPrediction = (req, res) => {
  const scriptPath = path.resolve('prediction/predict_inventory.py');

  exec(`python "${scriptPath}"`, (error, stdout, stderr) => {
    if (error) {
      console.error('Python error:', error.message);
      return res.status(500).json({ error: 'Prediction script failed' });
    }

    try {
      const data = JSON.parse(stdout);
      res.json(data);
    } catch (parseErr) {
      console.error('JSON Parse Error:', parseErr.message);
      res.status(500).json({ error: 'Failed to parse prediction output' });
    }
  });
};
