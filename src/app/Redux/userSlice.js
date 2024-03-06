import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: null,
  unVerified: [],
  verified: [],
  blocked: [],
  jobData: [],
  appliedJobs: [],
  isLoading: true,
  userType: null
};

const campusSlice = createSlice({
  name: "campus",
  initialState,
  reducers: {

    addData: (state, action) => {
      state.userData = action.payload;
      const temp = Object.values(state.userData);

      state.unVerified = temp.filter(user => user.name !== 'admin' && !user.adminVerifiedUser && !user.adminBlockedUser);
      state.verified = temp.filter(user => user.name !== 'admin' && user.adminVerifiedUser && !user.adminBlockedUser);
      state.blocked = temp.filter(user => user.name !== 'admin' && user.adminBlockedUser);
      if (state.userData) state.isLoading = false;
    },

    setCurrentUser: (state, action) => {
      state.userType = action.payload;
    },

    addJobPost: (state, action) => {
      state.jobData = action.payload;
    },

  }
});

export const { addData, addJobPost, applyJob, setCurrentUser } = campusSlice.actions;
export default campusSlice.reducer;
