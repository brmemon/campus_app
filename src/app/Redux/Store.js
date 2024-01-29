// import { configureStore } from "@reduxjs/toolkit"

import { configureStore } from "@reduxjs/toolkit";
import { campusSlice } from "./userSlice";

// export const store = configureStore({
//     reducer: userReducer,
// })



const store = configureStore({
    reducer:{
        campus : campusSlice,
    }
})


export default store;
