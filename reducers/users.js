import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: null,
    user: null,
};

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers:  {
        login: (state, action) => {
            state.token = action.payload.token;
            state.user = action.payload.user;
        },
        logout: (state) => {
            state.token = null;
            state.user = null;
        },
    },
});

export const { login, logout } = usersSlice.actions;
export default usersSlice.reducer;