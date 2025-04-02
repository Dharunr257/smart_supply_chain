
# 🚚 Smart Supply Chain Project (Phase 1 & 2)

A full-stack logistics management system to track, manage, and optimize supply chain inventory and shipment using live GPS, predictive ML models, barcode generation, and data visualizations.

---

## 📁 Project Structure

```
.
├── SMART_SUPPLY_CHAIN_PROJECT/
│   ├── stock-dashboard-backend/       # Phase 1 Backend (Node.js + PostgreSQL)
│   ├── stock-dashboard-frontend/      # Phase 1 Frontend (React + Vite)
│
├── SMART_SUPPLY_CHAIN_PROJECT_PHASE2/
│   ├── stock-dashboard-backend/       # Phase 2 Backend
│   ├── stock-dashboard-frontend/      # Phase 2 Frontend
```

---

## ⚙️ Prerequisites

> Make sure these are installed on your system:

- [Node.js](https://nodejs.org/) (v16 or above)
- [PostgreSQL](https://www.postgresql.org/) (v13+)
- [Python](https://www.python.org/) (for ML script)
- [npm](https://www.npmjs.com/)
- [Vite](https://vitejs.dev/) (`npm install -g vite`)
- Internet access (for geocoding APIs, ORS)

---

## 🌍 Environment Setup

### 📦 Phase 1 - Backend (`SMART_SUPPLY_CHAIN_Phase_1/stock-dashboard-backend`)

1. Navigate to backend folder:
   ```bash
   cd SMART_SUPPLY_CHAIN_Phase_1/stock-dashboard-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file:
   ```env
   PORT=5001
   PG_HOST=localhost
   PG_PORT=5432
   PG_USER=your_pg_username
   PG_PASSWORD=your_pg_password
   PG_DATABASE=smart_supply_chain
   ```

4. Run the backend server:
   ```bash
   npm run dev
   ```

---

### 💻 Phase 1 - Frontend (`SMART_SUPPLY_CHAIN_Phase_1/stock-dashboard-frontend`)

1. Navigate to frontend:
   ```bash
   cd SMART_SUPPLY_CHAIN_Phase_1/stock-dashboard-frontend
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Start frontend dev server:
   ```bash
   npm run dev
   ```

---

### 📦 Phase 2 - Backend (`SMART_SUPPLY_CHAIN_PHASE2/stock-dashboard-backend`)

1. Go to Phase 2 backend:
   ```bash
   cd SMART_SUPPLY_CHAIN_PHASE2/stock-dashboard-backend
   ```

2. Install:
   ```bash
   npm install
   ```

3. Create `.env`:
   ```env
   PORT=5002
   PG_HOST=localhost
   PG_PORT=5432
   PG_USER=your_pg_username
   PG_PASSWORD=your_pg_password
   PG_DATABASE=smart_supply_chain
   ```

4. Run Phase 2 backend:
   ```bash
   npm run dev
   ```

---

### 💻 Phase 2 - Frontend (`SMART_SUPPLY_CHAIN_PHASE2/stock-dashboard-frontend`)

1. Go to Phase 2 frontend:
   ```bash
   cd SMART_SUPPLY_CHAIN_PHASE2/stock-dashboard-frontend
   ```

2. Install:
   ```bash
   npm install
   ```

3. Start dev server:
   ```bash
   npm run dev
   ```

---

## 📊 Prediction Script (ML Model)

Located at:
```bash
SMART_SUPPLY_CHAIN_Phase_1/stock-dashboard-backend/prediction/predict_inventory.py
```

Install requirements:
```bash
pip install pandas scikit-learn psycopg2-binary
```

---

## 📦 Key Dependencies

### Backend (Node.js)
```bash
npm install express dotenv pg cors uuid moment
npm install --save-dev nodemon
```

### Frontend (React + Vite)
```bash
npm install axios react-router-dom leaflet react-leaflet chart.js react-chartjs-2 @mui/material @mui/icons-material @emotion/react @emotion/styled
```

---

## 🧠 Key Features

### ✅ Phase 1
- Track live stock with location
- Inventory & delivery dashboards
- Graphs, stats, maps, auto-refresh
- Predict inventory using ML
- Route visualization on map

### ✅ Phase 2
- Add stock with barcode
- Update stock through lifecycle (inventory → transit → delivered)
- Dropdown-based location selection (source/destination)
- Connected to Phase 1 via shared DB

---

## 🚀 Run All Projects Together

Use 4 terminals:

```bash
# Terminal 1 - Phase 1 Backend
cd SMART_SUPPLY_CHAIN_Phase_1/stock-dashboard-backend
npm run dev

# Terminal 2 - Phase 1 Frontend
cd SMART_SUPPLY_CHAIN_Phase_1/stock-dashboard-frontend
npm run dev

# Terminal 3 - Phase 2 Backend
cd SMART_SUPPLY_CHAIN_PHASE2/stock-dashboard-backend
npm run dev

# Terminal 4 - Phase 2 Frontend
cd SMART_SUPPLY_CHAIN_PHASE2/stock-dashboard-frontend
npm run dev
```

---

## 📬 Help

If anything breaks, check:

- Console/Network tab
- Backend logs
- Database errors
- `.env` issues
