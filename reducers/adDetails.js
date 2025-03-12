import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value : {},
};

export const adDetailsSlice = createSlice({
    name: 'adDetails',
    initialState,
    reducers:  {
        addData: (state, action) => {
            state.value = action.payload; 
        },
    }
});

export const { addData} = adDetailsSlice.actions;
export default adDetailsSlice.reducer;