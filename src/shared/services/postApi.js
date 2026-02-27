import axiosInstance from "./axiosInstance";

export const fetchRecipes = () => {
    return axiosInstance.get('/recipes')
}

export const fetchRecipeById = (id) => {
    return axiosInstance.get(`/recipes/${id}`)
}
