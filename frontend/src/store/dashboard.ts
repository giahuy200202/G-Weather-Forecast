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
  weather: IWeather[];
  currentWeather: IWeather;
  isLoading: Boolean;
}

const initialDashboardState: InitialDashboardState = {
  weather: [],
  currentWeather: {
    location: '',
    date: '',
    temperature: '',
    wind: '',
    humidity: '',
    imgCondition: '',
    textCondition: ''
  },
  isLoading: false
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: initialDashboardState,
  reducers: {
    updateIsLoading(state, action: PayloadAction<Boolean>){
      state.isLoading = action.payload;
    },
    updateWeather(state, action: PayloadAction<IWeather[]>){
      state.weather = [...action.payload];
      state.currentWeather = {...action.payload[0]};
    }
  },
});

export const dashboardActions = dashboardSlice.actions;

export default dashboardSlice.reducer;
