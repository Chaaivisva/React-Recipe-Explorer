import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, isAuthenticated } from "../../auth/services/authService";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");   
  };

  if (!isAuthenticated()) return null;  

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          sx={{ cursor: "pointer" }}
          onClick={() => navigate("/dashboard")}
        >
          Dashboard
        </Typography>

        <Box>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;