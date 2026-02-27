import { useNavigate } from "react-router-dom";
import { Container, Typography, Button, Box } from "@mui/material";

function NotFound() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          height: "80vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Typography variant="h1" color="error" fontWeight="bold">
          404
        </Typography>

        <Typography variant="h5" gutterBottom>
          Page Not Found
        </Typography>

        <Typography variant="body1" sx={{ mb: 3 }}>
          The page you are looking for does not exist.
        </Typography>

        <Button
          variant="contained"
          onClick={() => navigate("/")}
        >
          Go Back
        </Button>
      </Box>
    </Container>
  );
}

export default NotFound;