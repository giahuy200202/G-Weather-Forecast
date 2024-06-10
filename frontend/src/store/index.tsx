import { configureStore } from "@reduxjs/toolkit";

import DashboardReducer from "./dashboard";

const store = configureStore({
  reducer: { dashboard: DashboardReducer },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
