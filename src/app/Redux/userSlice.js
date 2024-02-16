// campusSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: null,
  unVerified: [],
  verified: [],
  blocked: [],
  jobData: [],
  appliedJobs: [],
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
    },

    addJobPost: (state, action) => {
      state.jobData = action.payload;
    },

    applyJob: (state, action) => {
      const jobId = action.payload;
      state.appliedJobs.push(jobId);
    },
  }
});

export const { addData, updateBlockedUser, addJobPost, applyJob } = campusSlice.actions;
export default campusSlice.reducer;
