import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: [],
};

const campusSlice = createSlice({
  name: "campus",
  initialState,
  reducers: {
    addData: (state, action) => {
      state.userData = action.payload;
      const temp = Object.values(state.userData)
    }
  }
});

export const { addData } = campusSlice.actions;
export default campusSlice.reducer;




// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   userData: null,
// };

// export const userSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     setUserData: (state, action) => {
//       state.userData = action.payload;
//       console.log('New user data:', action.payload);
//     },
//   },
// });

// export const { setUserData } = userSlice.actions;
// export const selectUserData = (state) => state.userData;

// export default userSlice.reducer;
