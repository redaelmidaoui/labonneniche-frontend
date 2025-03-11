import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: null,
    lastname: null,
    firstname: null,
    mail: null,
    adresse: null,
    phoneNumber: null,
    profilePhoto: null,
    registrationQuestionnaire: [],
    favoriteA: null,
    unavailable: [],
    appointments: [],
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:  {
        login: (state, action) => {
            state = action.payload;
        },
        logout: (state) => {
            state = initialState;
        },
    },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;


