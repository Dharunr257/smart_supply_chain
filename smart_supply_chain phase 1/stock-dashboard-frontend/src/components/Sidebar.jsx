import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import InventoryIcon from "@mui/icons-material/Inventory";
import SearchIcon from "@mui/icons-material/TravelExplore";
import { useLocation, useNavigate } from "react-router-dom";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

const Sidebar = ({ open, toggle, isMobile, width }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const drawerContent = (
    <>
      <Toolbar />
      <List>
        <ListItem
          button
          component="div"
          sx={{ cursor: "pointer" }}
          selected={location.pathname === "/inventory"}
          onClick={() => navigate("/inventory")}
        >
          <ListItemIcon>
            <InventoryIcon />
          </ListItemIcon>
          <ListItemText primary="Inventory" />
        </ListItem>
        <ListItem
          button
          component="div"
          sx={{ cursor: "pointer" }}
          selected={location.pathname === "/find-stock"}
          onClick={() => navigate("/find-stock")}
        >
          <ListItemIcon>
            <SearchIcon />
          </ListItemIcon>
          <ListItemText primary="Find Stock" />
        </ListItem>

        <ListItem
          button
          selected={location.pathname === "/transit"}
          onClick={() => navigate("/transit")}
          sx={{ cursor: "pointer" }}
        >
          <ListItemIcon>
            <LocalShippingIcon />
          </ListItemIcon>
          <ListItemText primary="Transit List" />
        </ListItem>

        <ListItem
          button
          sx={{ cursor: "pointer" }}
          selected={location.pathname === "/delivered"}
          onClick={() => navigate("/delivered")}
        >
          <ListItemIcon>
            <LocalShippingIcon />
          </ListItemIcon>
          <ListItemText primary="Delivered Items" />
        </ListItem>
      </List>
    </>
  );

  return (
    <Drawer
      variant="temporary"
      open={open}
      onClose={toggle}
      sx={{
        width,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width,
          boxSizing: "border-box",
          top: 0,
        },
      }}
    >
      {drawerContent}
    </Drawer>
  );
};

export default Sidebar;
