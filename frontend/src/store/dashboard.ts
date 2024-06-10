import { PayloadAction, createSlice } from "@reduxjs/toolkit";



interface InitialDashboardState {
  data: [];
}

const initialDashboardState: InitialDashboardState = {
  data: [],

};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: initialDashboardState,
  reducers: {
    // updateRevenue(state, action: PayloadAction<number[]>){
    //   state.chartData.yLabels = [...action.payload];
    //   state.isDoneChartData = true;
    // }
  },
});

export const dashboardActions = dashboardSlice.actions;

export default dashboardSlice.reducer;
