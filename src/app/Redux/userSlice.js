import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: null,
  unVerified: [],
  verified: [],
  blocked: [],
  jobData: [],
  appliedJobs: [],
  userType: null,
  isLoading: true
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
      state.isLoading = false;
      console.log(state.blocked , "redux user block");
    },

    setCurrentUser: (state, action) => {
      state.userType = action.payload;
    },

    addJobPost: (state, action) => {
      state.jobData = action.payload;
    },

  }
});

export const { addData, addJobPost, setCurrentUser } = campusSlice.actions;
export default campusSlice.reducer;
