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

const recipeSlice = createSlice({
    name: 'recipes',
    initialState: {
        items: [],
        reactions: storedReactions,
        status: 'idle'
    },

    reducers: {
       likeRecipe: (state, action) => {
            const recipe = state.items.find(r => r.id === action.payload);
            if (!recipe) return;

            recipe.likes += 1;
            recipe.reaction = "liked";

            localStorage.setItem("recipes", JSON.stringify(state.items));
        },

        dislikeRecipe: (state, action) => {
            const recipe = state.items.find(r => r.id === action.payload);
            if (!recipe || recipe.likes === 0) return;

            recipe.dislikes += 1;
            recipe.reaction = "disliked";

            localStorage.setItem("recipes", JSON.stringify(state.items));
        }
    },

    extraReducers: (builder) => {
    builder
      .addCase(getRecipes.pending, (state) => {
        state.status = 'loading';
      })

      .addCase(getRecipes.fulfilled, (state, action) => {
        state.status = 'succeeded';

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

      .addCase(getRecipes.rejected, (state) => {
        state.status = 'failed';
      })

      .addCase(getRecipeById.fulfilled, (state, action) => {
        const index = state.items.findIndex(r => r.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = {
            ...action.payload,
            likes: state.items[index].likes,
            dislikes: state.items[index].dislikes,
            reaction: state.items[index].reaction
          };
        }
      });
  }
});

export const { likeRecipe, dislikeRecipe } = recipeSlice.actions;
export default recipeSlice.reducer;