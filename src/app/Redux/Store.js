import { configureStore } from "@reduxjs/toolkit"
import campusReducer from "./CampusSlice";

export const store = configureStore({
    reducer:campusReducer
})