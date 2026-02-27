import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getRecipes,
  likeRecipe,
  dislikeRecipe,
} from "../redux/recipeSlice";

import CustomCard from "../shared/uiControls/Card";

import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";

import {
  Container,
  Grid,
  IconButton,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";

import Navbar from "../shared/components/Navbar";

function Dashboard() {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.recipes);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch]);

  if (status === "loading") {
    return (
      <Box
        sx={{
          height: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Recipe Dashboard
      </Typography>

      <Grid container spacing={3}>
        {items.map((recipe) => (
          <Grid item xs={12} sm={6} md={4} key={recipe.id}>
            <CustomCard
              title={recipe.name}
              onClick={() => navigate(`/recipes/${recipe.id}`)}
              actions={
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  {/* Like Button */}
                  <IconButton
                    onClick={() => dispatch(likeRecipe(recipe.id))}
                    color="primary"
                  >
                    <ThumbUpAltIcon />
                  </IconButton>
                  <Typography>{recipe.likes || 0}</Typography>

                  {/* Dislike Button */}
                  <IconButton
                    onClick={() => dispatch(dislikeRecipe(recipe.id))}
                    color="error"
                    disabled={(recipe.likes || 0) === 0}
                  >
                    <ThumbDownAltIcon />
                  </IconButton>
                  <Typography>{recipe.dislikes || 0}</Typography>
                </Box>
              }
            >
              <img
                src={recipe.image}
                alt={recipe.name}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  marginBottom: "10px",
                }}
              />

              <Typography variant="body2">
                <strong>Cuisine:</strong> {recipe.cuisine}
              </Typography>

              <Typography variant="body2">
                <strong>Difficulty:</strong> {recipe.difficulty}
              </Typography>
            </CustomCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Dashboard;