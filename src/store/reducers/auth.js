import { createSlice } from "@reduxjs/toolkit";

const intialState = {
  token: null,
  isLoggedIn: false,
  user: {},
  districts: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState: intialState,
  reducers: {
    authenticate(state, action) {
      state.token = action.payload.token;
      state.isLoggedIn = !!state.token;
      state.user = action.payload.user;
      return;
    },
    logout(state, action) {
      state.token = null;
      state.isLoggedIn = false;
      state.user = null;
    },
    setDistricts(state, action) {
      state.districts = action.payload.districts;
    },
  },
});

export default authSlice;
