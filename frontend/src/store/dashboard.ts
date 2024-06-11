import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IWeather {
  location: string
  date: string
  temperature: string
  wind: string
  humidity: string
  imgCondition: string
  textCondition: string
}

interface InitialDashboardState {
  weather: IWeather[]
}

const initialDashboardState: InitialDashboardState = {
  weather: [],
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: initialDashboardState,
  reducers: {
    updateWeather(state, action: PayloadAction<IWeather[]>){
      state.weather = [...action.payload];
    }
  },
});

export const dashboardActions = dashboardSlice.actions;

export default dashboardSlice.reducer;
