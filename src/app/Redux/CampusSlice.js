import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    campusData: [],
};

export const campusSlice = createSlice({
    name: "Campus",
    initialState,
    reducers: {
        addData: (state, action) => {
            state.campusData.push(action.payload);
        },
    },
});

export const { addData } = campusSlice.actions;
export const selectCampusData = (state) => state.campusData;
export default campusSlice.reducer;
