import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: [],
  unVerified: [],
  verified: [],
  blocked: [],
  jobData: [],

};

const campusSlice = createSlice({
  name: "campus",
  initialState,
  reducers: {
    addData: (state, action) => {
      state.userData = action.payload;
      const temp = Object.values(state.userData)

      // Un Verified
      state.unVerified = temp.filter(user => user.name !== 'admin' && !user.adminVerifiedUser && !user.adminBlockedUser);
      // Verified   
      state.verified = temp.filter(user => user.name !== 'admin' && user.adminVerifiedUser && !user.adminBlockedUser);
      // Blocked   
      state.blocked = temp.filter(user => user.name !== 'admin' && user.adminBlockedUser);
    },

    addJobPost: (state, action) => {
      state.jobData = action.payload;
      const temper = Object.values(state.jobData)
    },

  }
});

export const { addData, addJobPost } = campusSlice.actions;
export default campusSlice.reducer;