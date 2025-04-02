import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import FindStock from './pages/FindStock';
import Delivered from './pages/Delivered';
import PredictedInventory from './pages/PredictedInventory';
import TransitList from './pages/TransitList';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/inventory" element={<Inventory />} />
      <Route path="/transit" element={<TransitList />} />
      <Route path="/find-stock" element={<FindStock />} />
      <Route path="/delivered" element={<Delivered />} />
      <Route path="/predict" element={<PredictedInventory />} />
    </Routes>
  );
};

export default App;
