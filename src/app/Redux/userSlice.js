import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: [],
  nonVerified: [],
  verified: [],
  blocked: []
};

const campusSlice = createSlice({
  name: "campus",
  initialState,
  reducers: {
    addData: (state, action) => {
      state.userData = action.payload;
      // Un Verified
      const temp = Object.values(state.userData)

      state.nonVerified = temp.filter(user => user.name !== 'admin' && !user.isAdminVerified && !user.isAdminBlocked);
      // Verified   
      state.verified = temp.filter(user => user.name !== 'admin' && user.isAdminVerified && !user.isAdminBlocked);

      // Blocked   
      state.blocked = temp.filter(user => user.name !== 'admin' && user.isAdminBlocked);

    },
    updateVerify: (state, action) => {
      console.log("non verified user: ", state.nonVerified)
    }
  }
});

export const { addData, updateVerify } = campusSlice.actions;
export default campusSlice.reducer;