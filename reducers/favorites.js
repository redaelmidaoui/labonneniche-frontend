import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	value: [],
};

export const favoritesSlice = createSlice({
	name: 'favorites',
	initialState,
	reducers: {
		addFavorite: (state, action) => {
			state.value.push(action.payload);
		},
		removeFavorite: (state, action) => {
			state.value = state.value.filter(bookmark => bookmark.title !== action.payload.title);
		},
		setFavorites: (state, action) => {
			state.value = action.payload || []; // Remplace par la liste correcte depuis la BDD
		  },
	},
});

export const { addFavorite, removeFavorite, setFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
