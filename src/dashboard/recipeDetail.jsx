import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
    Typography,
    Box,
    List,
    ListItem,
    Divider,
    Container,
    IconButton,
} from "@mui/material";
import {
  getRecipes,
  likeRecipe,
  dislikeRecipe,
} from "../redux/recipeSlice";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";

function RecipeDetail() {
    const { id } = useParams();
    const { items } = useSelector((state) => state.recipes);
    const dispatch = useDispatch();
    const recipe = items.find((r) => r.id === parseInt(id));

    if(!recipe) return <Typography variant="h6">Recipe not found</Typography>;

    return (
        <Container maxWidth="md" sx={{ mt:4 }}>
            <Typography variant="h4" gutterBottom>{recipe.name}</Typography>

            <Box
                component="img"
                src={recipe.image}
                alt={recipe.name}
                sx={{
                width: "100%",
                height: 350,
                objectFit: "cover",
                borderRadius: 2,
                mb: 3,
                }}
            />
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
            <Typography><strong>Cuisine:</strong> {recipe.cuisine}</Typography>
            <Typography><strong>Difficulty:</strong> {recipe.difficulty}</Typography>
            <Typography><strong>Calories:</strong> {recipe.caloriesPerServing}</Typography>
            <Typography><strong>Prep Time:</strong> {recipe.prepTimeMinutes} mins</Typography>
            <Typography><strong>Cook Time:</strong> {recipe.cookTimeMinutes} mins</Typography>
            <Typography><strong>Servings:</strong> {recipe.servings}</Typography>
            <Typography><strong>Rating:</strong> ⭐ {recipe.rating} ({recipe.reviewCount} reviews)</Typography>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6">Tags</Typography>
            <Box sx={{ mb: 2 }}>
                {recipe.tags.map((tag, index) => (
                     <Typography key={index} component="span" sx={{ mr: 1, mb: 1, display: "inline-block" }}>{tag}</Typography>
                ))}
            </Box>

             <Divider sx={{ my: 3 }} />

            <Typography variant="h6">Ingredients</Typography>
            <List>
                {recipe.ingredients.map((item, index) => (
                <ListItem key={index}>• {item}</ListItem>
                ))}
            </List>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6">Instructions</Typography>
            <List>
                {recipe.instructions.map((step, index) => (
                <ListItem key={index}>
                    {index + 1}. {step}
                </ListItem>
                ))}
            </List>
        </Container>
    );
}

export default RecipeDetail;