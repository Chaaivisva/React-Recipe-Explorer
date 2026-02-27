import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getRecipes,
  likeRecipe,
  dislikeRecipe,
} from "../redux/recipeSlice";

import Button from "../shared/uiControls/Button";
import CustomCard from "../shared/uiControls/Card";

import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

function Dashboard() {
  const dispatch = useDispatch();
  const { items, reactions, status } = useSelector(
    (state) => state.recipes
  );

  useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch]);

  if (status === "loading") return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Recipe Dashboard</h2>

      {items.map((recipe) => {
        const likeCount = reactions[recipe.id]?.like || 0;
        const dislikeCount = reactions[recipe.id]?.dislike || 0;

        return (
          <CustomCard
            key={recipe.id}
            title={recipe.name}
            actions={
              <>
              {/* Like Button */}
              <IconButton
                onClick={() => dispatch(likeRecipe(recipe.id))}
                color={recipe.reaction === "like" ? "primary" : "default"}
              >
                <ThumbUpAltIcon />
              </IconButton>
              <Typography>{recipe.likes || 0}</Typography>

              {/* Dislike Button */}
              <IconButton
                onClick={() => dispatch(dislikeRecipe(recipe.id))}
                color={recipe.reaction === "dislike" ? "error" : "default"}
                disabled={(recipe.likes || 0) === 0}
              >
                <ThumbDownAltIcon />
              </IconButton>
              <Typography>{recipe.dislikes || 0}</Typography>
              </>
            }
          >
            <img
              src={recipe.image}
              alt={recipe.name}
              style={{ width: "100%", height: "200px", objectFit: "cover" }}
            />

            <p><strong>Cuisine:</strong> {recipe.cuisine}</p>
            <p><strong>Difficulty:</strong> {recipe.difficulty}</p>
          </CustomCard>
        );
      })}
    </div>
  );
}

export default Dashboard;