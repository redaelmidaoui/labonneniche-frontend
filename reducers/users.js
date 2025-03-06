import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: [],
};

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers:  {
        setUsers: (state, action) => {
            state.value = action.payload;
        },
        addUser: (state, action) => {
            state.value.push(action.payload)
        },
        removeUser: (state, action) => {
            state.value = state.value.filter(user => user._id !== action.payload);
        },
        clearUsers: (state) => {
            state.value = [];
        },
    },
});

export const { setUsers, addUser, removeUser, clearUsers } = usersSlice.actions;
export default usersSlice.reducer;