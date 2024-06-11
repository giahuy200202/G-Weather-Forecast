import React from "react";
import styles from "./result.module.css";
import { useAppDispatch, useAppSelector } from "../../../hooks/ReduxHooks";
import BeatLoader from "react-spinners/BeatLoader";
import toast, { Toaster } from "react-hot-toast";
import { ReactComponent as EmailIcon } from "../../../assets/svg/email.svg";

import { dashboardActions } from "@store/dashboard";
import { useState } from "react";

const Result: React.FC = () => {
  const dispatch = useAppDispatch();

  return (
    <div className={styles["result-container"]}>
      <div className={styles["banner-container"]}>
        <div>
          <h1>London (2023-06-19)</h1>
          <p>Temparature: 18.17 °C</p>
          <p>Wind: 18.17 M/S</p>
          <p>Humidity: 76 %</p>
        </div>
        <div className={styles["condition-container"]}>
          <img src="https://cdn.weatherapi.com/weather/64x64/day/176.png" alt="weather icon" />
          <p>Party cloudy</p>
        </div>
      </div>
      <h1>4-Day Forecast</h1>
      <div className={styles["banner-container"]}>
        <div>
          <h1>London (2023-06-19)</h1>
          <p>Temparature: 18.17 °C</p>
          <p>Wind: 18.17 M/S</p>
          <p>Humidity: 76 %</p>
        </div>
        <div className={styles["condition-container"]}>
          <img src="https://cdn.weatherapi.com/weather/64x64/day/176.png" alt="weather icon" />
          <p>Party cloudy</p>
        </div>
      </div>
    </div>
  );
};

export default Result;
