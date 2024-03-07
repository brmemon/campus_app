import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: null,
  data: [],
  nonVerified: [],
  verified: [],
  blocked: [],
  userUid: [],
  currentUserInfo: [],
  userRole: [],
  allJobsData: [],
  studentAllJobs: [],
  filteredJob: [],
  appliedJobs: [],
  jobsAppplied: [],
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
      state.userType = temp.filter(user => user.uid == state.userUid)
      state.appliedJobs = state.userType?.name;
      if (state.userData) state.isLoading = false;
    },

    setCurrentUser: (state, action) => {
      state.userType = action.payload;
    },

    addJobPost: (state, action) => {
      state.jobData = action.payload;
    },

    addRole: (state, action) => {
      state.userRole = action.payload;
      console.log(addRole, "addRole");
    },
    clearUser: (state, action) => {
      state.userUid = action.payload;
      state.userType = action.payload;
      state.userRole = action.payload;
      console.log(clearUser, "clearUser");
    },
    
    clearJob: (state, action) => {
      state.filteredJob = action.payload;
      console.log(clearJob, "clearJob");
    },

    addJob: (state, action) => {
      state.allJobsData = action.payload
      console.log(addJob, "addJob");

    },
    addAppliedJobs: (state, action) => {
      state.appliedJobs = action.payload;
      console.log(addAppliedJobs, "appliedJobs");
    },
  }
});

export const { addData, addJobPost, applyJob, setCurrentUser, clearUser, addRole, addJob, addAppliedJobs, clearJob, userAuthenticated, currentUser, clearUserAuthenticated, loadingStatus } = campusSlice.actions;
export default campusSlice.reducer;



















// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   data: [],
//   nonVerified: [],
//   verified: [],
//   blocked: [],
//   userUid: [],
//   currentUserInfo: [],
//   userRole: [],
//   allJobsData: [],
//   studentAllJobs: [],
//   filteredJob: [],
//   appliedJobs: [],
//   jobsAppplied: [],
//   isUserAuthenticated: false,
//   loaderStatus: true
// }

// const campusSlice = createSlice({
//   name: 'campus',
//   initialState,
//   reducers: {
//     userAuthenticated: (state, action) => {
//       state.isUserAuthenticated = action.payload;

//     },
//     clearUserAuthenticated: (state, action) => {
//       state.isUserAuthenticated = action.payload
//     },
//     loadingStatus: (state, action) => {
//       state.loaderStatus = action.payload
//     },
//     currentUser: (state, action) => {
//       state.currentUserInfo = action.payload;

//     },
//     addData: (state, action) => {
//       state.data = action.payload;
//       // for non-verified users
//       let temp = Object.values(state.data)

//       state.nonVerified = temp.filter(user => user.name !== 'admin' && !user.isAdminVerified && !user.isAdminBlocked);
//       // for verified users
//       state.verified = temp.filter(user => user.name !== 'admin' && user.isAdminVerified && !user.isAdminBlocked);

//       // for blocked users
//       state.blocked = temp.filter(user => user.name !== 'admin' && user.isAdminBlocked);

//       // for current user
//       // state.currentUserInfo = temp.filter(user => user.uid == state.userUid)

//       // Applied Jobs
//       // state.appliedJobs = state.currentUserInfo.name;

//     },
//     addUser: (state, action) => {
//       state.userUid = action.payload;
//       state.loaderStatus = false

//     },

//     addRole: (state, action) => {
//       state.userRole = action.payload;
//     },
//     clearUser: (state, action) => {
//       state.userUid = action.payload;
//       state.currentUserInfo = action.payload;
//       state.userRole = action.payload;
//     },
//     clearJob: (state, action) => {
//       state.filteredJob = action.payload;
//     },

//     addJob: (state, action) => {
//       state.allJobsData = action.payload

//     },
//     addAppliedJobs: (state, action) => {
//       state.appliedJobs = action.payload;
//     },
//   }
// })

// export const { addData, addUser, clearUser, addRole, addJob, addAppliedJobs, clearJob, userAuthenticated, currentUser, clearUserAuthenticated, loadingStatus } = campusSlice.actions;
// export default campusSlice.reducer