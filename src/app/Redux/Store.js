import { configureStore } from "@reduxjs/toolkit"

export const store = configureStore({
    reducer: userReducer,
})



// redux/store.js
// import { configureStore } from '@reduxjs/toolkit';
// import userReducer from './userSlice';

// const store = configureStore({
//   reducer: {
//     user: userReducer,
//   },
// });

// export default store;

