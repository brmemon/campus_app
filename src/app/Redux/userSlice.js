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

      state.unVerified = temp.filter(user => user.name !== 'admin' && !user.adminVerifiedUser && !user.adminBlockedUser);
      state.verified = temp.filter(user => user.name !== 'admin' && user.adminVerifiedUser && !user.adminBlockedUser);
      state.blocked = temp.filter(user => user.name !== 'admin' && user.adminBlockedUser);
      if (state.userData) state.isLoading = false;
      
      const currentUser = temp.find(user => user.userId === action.payload);
      console.log("testngggg", action.payload);
      state.currentUserData = currentUser;
      console.log(currentUser, "redux page current user");
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































// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   userData: null,
//   unVerified: [],
//   verified: [],
//   blocked: [],
//   jobData: [],
//   appliedJobs: [],
//   isLoading: true,
// };

// const campusSlice = createSlice({
//   name: "campus",
//   initialState,
//   reducers: {

//     addData: (state, action) => {
//       state.userData = action.payload;
//       const temp = Object.values(state.userData);

//       state.unVerified = temp.filter(user => user.name !== 'admin' && !user.adminVerifiedUser && !user.adminBlockedUser);
//       state.verified = temp.filter(user => user.name !== 'admin' && user.adminVerifiedUser && !user.adminBlockedUser);
//       state.blocked = temp.filter(user => user.name !== 'admin' && user.adminBlockedUser);
//       if (state.userData) state.isLoading = false;

//     },

//     addJobPost: (state, action) => {
//       state.jobData = action.payload;
//     },

//     applyJob: (state, action) => {
//       const jobId = action.payload;
//       state.appliedJobs.push(jobId);
//     },
//   }
// });

// export const { addData, addJobPost, applyJob } = campusSlice.actions;
// export default campusSlice.reducer;