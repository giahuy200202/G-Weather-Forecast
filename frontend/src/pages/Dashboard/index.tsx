import React from "react";
import styles from "./dashboard.module.css";

import Search from "../../components/Dashboard/Search/index";
import Result from "../../components/Dashboard/Result/index";
import { useAppDispatch } from "@hooks/ReduxHooks";
import { useEffect } from "react";
import axios from "axios";
import { dashboardActions } from "@store/dashboard";
import { Toaster } from 'react-hot-toast';

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(dashboardActions.updateIsLoading(true));
    navigator.geolocation.getCurrentPosition((position) => {
      const weatherData = localStorage.getItem(`${position.coords.latitude},${position.coords.longitude}`);
      if (weatherData !== null) {
        dispatch(dashboardActions.updateWeather(JSON.parse(weatherData)));
        dispatch(dashboardActions.updateIsLoading(false));
        }
        else {
          axios
          .post(`${process.env.REACT_APP_API_URI}/v1/weather/current`, {location: `${position.coords.latitude},${position.coords.longitude}`})
          .then((res) => {
            dispatch(dashboardActions.updateWeather(res.data.data));
            localStorage.setItem(`${position.coords.latitude},${position.coords.longitude}`, JSON.stringify(res.data.data));
            setTimeout(
              () => {
                if (localStorage.getItem(`${position.coords.latitude},${position.coords.longitude}`) !== null) {
                  localStorage.removeItem(`${position.coords.latitude},${position.coords.longitude}`)
                }
              },
              14400000
            );
            dispatch(dashboardActions.updateIsLoading(false));
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  }, []);

  return (
    <React.Fragment>
      <div className={styles["dashboard-container"]}>
        <div className={styles["content-container"]}>
          <div className={styles["search-container"]}> <Search /></div>
          <div className={styles["result-container"]}> <Result /></div>
        </div>
      </div>
      <Toaster position="top-right" />
    </React.Fragment>
  );
};

export default Dashboard;
