import { configureStore } from "@reduxjs/toolkit";
import campusSlice from "./userSlice";

const store = configureStore({
    reducer: {
        campus: campusSlice,
    }
})


export default store;
