import { Box, useMediaQuery } from "@mui/material";
import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const drawerWidth = 240;

const Layout = ({ children }) => {
  const isMobile = useMediaQuery("(max-width: 895px)");
  const [sidebarOpen, setSidebarOpen] = useState(false); // ✅ closed by default

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar
        open={sidebarOpen}
        toggle={() => setSidebarOpen(!sidebarOpen)}
        isMobile={isMobile}
        width={drawerWidth}
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          mt: "64px",
          width: "100%",
          maxWidth: "1400px",
          mx: "auto",
          px: { xs: 2, md: 4 },
          py: 3,
          transition: "all 0.3s ease",
        }}
      >
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
