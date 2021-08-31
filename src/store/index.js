import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/auth";
import notificationSlice from "./reducers/notification";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    notification: notificationSlice.reducer,
  },
});
// export const url = "http://localhost:3000/api/v1";
// export const socketUrl = "http://localhost:3000";

export const url = "https://api-dnd.herokuapp.com/api/v1";
export const socketUrl = "https://api-dnd.herokuapp.com";

export const authActions = authSlice.actions;
export const notificationActions = notificationSlice.actions;

export default store;
