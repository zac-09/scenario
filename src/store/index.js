import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/auth";
import notificationSlice from "./reducers/notification";
import scenarioSlice from "./reducers/scenario";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    notification: notificationSlice.reducer,
    scenario: scenarioSlice.reducer,
  },
});
//export const url = "http://localhost:4000/api/v1";
// export const socketUrl = "http://localhost:3000";

export const url = "https://scenario-api.herokuapp.com/api/v1";


export const authActions = authSlice.actions;
export const scenarioActions = scenarioSlice.actions;
export const notificationActions = notificationSlice.actions;

export default store;
