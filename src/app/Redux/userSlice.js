import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUserData: null,
  userData: null,
  unVerified: [],
  verified: [],
  blocked: [],
  jobData: [],
  appliedJobs: [],
  isLoading: true,
};

const campusSlice = createSlice({
  name: "campus",
  initialState,
  reducers: {
    addData: (state, action) => {
      state.userData = action.payload;
      const temp = Object.values(state.userData);

      const currentUser = temp.find(user => user.userId === action.payload.currentUserUid);
      state.currentUserData = currentUser;
      // console.log(currentUser, "currentUser");

      state.unVerified = temp.filter(user => user.userId !== action.payload.currentUserUid && user.name !== 'admin' && !user.adminVerifiedUser && !user.adminBlockedUser);
      state.verified = temp.filter(user => user.userId !== action.payload.currentUserUid && user.name !== 'admin' && user.adminVerifiedUser && !user.adminBlockedUser);
      state.blocked = temp.filter(user => user.userId !== action.payload.currentUserUid && user.name !== 'admin' && user.adminBlockedUser);
      state.isLoading = false;
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

export const { addData, addJobPost, applyJob } = campusSlice.actions;
export default campusSlice.reducer;
