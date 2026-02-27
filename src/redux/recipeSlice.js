import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchRecipes, fetchRecipeById } from '../shared/services/postApi';

const storedReactions = JSON.parse(localStorage.getItem('recipeReactions')) || {};

export const getRecipes = createAsyncThunk('recipes/fetchRecipes', async () => {
    const response = await fetchRecipes();
    return response.data.recipes;
});

export const getRecipeById = createAsyncThunk('recipes/fetchRecipeById', async (id) => {
    const response = await fetchRecipeById(id);
    return response.data;
});

const storedItems = JSON.parse(localStorage.getItem("recipes")) || [];

const recipeSlice = createSlice({
  name: "recipes",
  initialState: {
    items: storedItems,
    status: "idle"
  },

  reducers: {
    likeRecipe: (state, action) => {
      const recipe = state.items.find(r => r.id === action.payload);
      if (!recipe) return;

      recipe.likes = (recipe.likes || 0) + 1;
      recipe.reaction = "like";

      localStorage.setItem("recipes", JSON.stringify(state.items));
    },

    dislikeRecipe: (state, action) => {
      const recipe = state.items.find(r => r.id === action.payload);
      if (!recipe) return;

      recipe.dislikes = (recipe.dislikes || 0) + 1;
      recipe.reaction = "dislike";

      localStorage.setItem("recipes", JSON.stringify(state.items));
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(getRecipes.pending, (state) => {
        state.status = "loading";
      })

      .addCase(getRecipes.fulfilled, (state, action) => {
        state.status = "succeeded";

        state.items = action.payload.map(recipe => {
          const existing = state.items.find(r => r.id === recipe.id);

          return {
            ...recipe,
            likes: existing?.likes || 0,
            dislikes: existing?.dislikes || 0,
            reaction: existing?.reaction || null
          };
        });

        localStorage.setItem("recipes", JSON.stringify(state.items));
      })

      .addCase(getRecipeById.fulfilled, (state, action) => {
        const existing = state.items.find(r => r.id === action.payload.id);

        if (existing) {
          Object.assign(existing, action.payload);
        } else {
          state.items.push({
            ...action.payload,
            likes: 0,
            dislikes: 0,
            reaction: null
          });
        }
      });
  }
});

export const { likeRecipe, dislikeRecipe } = recipeSlice.actions;
export default recipeSlice.reducer;