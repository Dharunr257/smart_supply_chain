import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CreateProduct from './pages/CreateProduct';
import UpdateProductStatus from './pages/UpdateProductStatus';
import { AppBar, Toolbar, Button } from '@mui/material';

const App = () => {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/">
            Create Product
          </Button>
          <Button color="inherit" component={Link} to="/update">
            Update Status
          </Button>
        </Toolbar>
      </AppBar>
      <Routes>
        <Route path="/" element={<CreateProduct />} />
        <Route path="/update" element={<UpdateProductStatus />} />
      </Routes>
    </Router>
  );
};

export default App;
