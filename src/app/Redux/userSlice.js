// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//     campusData: [],
// };

// export const campusSlice = createSlice({
//     name: "Campus",
//     initialState,
//     reducers: {
//     },
// });

// export const { } = campusSlice.actions;
// export default campusSlice.reducer;




import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
      console.log('New user data:', action.payload);
    },
  },
});

export const { setUserData } = userSlice.actions;
export const selectUserData = (state) => state.userData;

export default userSlice.reducer;
