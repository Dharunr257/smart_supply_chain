import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import TuckIcon from '@mui/icons-material/TurnedInNot';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { useThemeContext } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';


const Header = ({ toggleSidebar }) => {
  const { toggleColorMode } = useThemeContext();
  const navigate = useNavigate();

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" onClick={toggleSidebar} sx={{ mr: 1 }}>
          <MenuIcon />
        </IconButton>
        <TuckIcon sx={{ mr: 1 }} />
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          Smart Supply Chain
        </Typography>
        <IconButton color="inherit" onClick={toggleColorMode}>
          <Brightness4Icon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
