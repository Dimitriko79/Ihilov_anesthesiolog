import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    data: [],
    view: "home",
    isFetchingData: true
};

const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        updateData: (state, action) => {
            state.data = {...action.payload};
        },
        setFetchingData: (state, action) => {
            state.isFetchingData = action.payload;
        },
        updateView: (state, action) => {
            state.view = action.payload;
        }
    },
});

export const { updateData, setFetchingData, updateView } = dataSlice.actions;
export default dataSlice.reducer;