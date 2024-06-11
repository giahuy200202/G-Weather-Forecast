import React from "react";
import styles from "./result.module.css";
import { useAppDispatch, useAppSelector } from "../../../hooks/ReduxHooks";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import BeatLoader from "react-spinners/BeatLoader";
import toast, { Toaster } from "react-hot-toast";
import { ReactComponent as EmailIcon } from "../../../assets/svg/email.svg";

import { dashboardActions } from "@store/dashboard";
import { useState } from "react";


const Result: React.FC = () => {
  const dispatch = useAppDispatch();
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 4
    },
    desktop: {
      breakpoint: { max: 3000, min: 1640 },
      items: 4
    },
    smallDesktop: {
      breakpoint: { max: 1640, min: 1160 },
      items: 3
    },
    largeTablet: {
      breakpoint: { max: 1160, min: 900 },
      items: 2
    },
    tablet: {
      breakpoint: { max: 900, min: 550 },
      items: 3
    },
    smallTablet: {
      breakpoint: { max: 550, min: 300 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 330, min: 0 },
      items: 1
    }
  };

  return (
    <div className={styles["result-container"]}>
      <div className={styles["banner-container"]}>
        <div className={styles["title-container"]}>
          <div className={styles["title-banner"]}>
            <h1>London </h1>
            <h1>(2023-06-19)</h1>
          </div>
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


      <Carousel responsive={responsive} >

        <div className={styles["each-day-weather"]}>
          <h3>2023-06-19</h3>
          <img src="https://cdn.weatherapi.com/weather/64x64/day/176.png" alt="weather icon" />
          <p>Temp: 18.17 °C</p>
          <p>Wind: 18.17 M/S</p>
          <p>Humidity: 76 %</p>
        </div>
        <div className={styles["each-day-weather"]}>
          <h3>2023-06-19</h3>
          <img src="https://cdn.weatherapi.com/weather/64x64/day/176.png" alt="weather icon" />
          <p>Temp: 18.17 °C</p>
          <p>Wind: 18.17 M/S</p>
          <p>Humidity: 76 %</p>
        </div>
        <div className={styles["each-day-weather"]}>
          <h3>2023-06-19</h3>
          <img src="https://cdn.weatherapi.com/weather/64x64/day/176.png" alt="weather icon" />
          <p>Temp: 18.17 °C</p>
          <p>Wind: 18.17 M/S</p>
          <p>Humidity: 76 %</p>
        </div>

        <div className={styles["each-day-weather"]}>
          <h3>2023-06-19</h3>
          <img src="https://cdn.weatherapi.com/weather/64x64/day/176.png" alt="weather icon" />
          <p>Temp: 18.17 °C</p>
          <p>Wind: 18.17 M/S</p>
          <p>Humidity: 76 %</p>
        </div>
        <div className={styles["each-day-weather"]}>
          <h3>2023-06-19</h3>
          <img src="https://cdn.weatherapi.com/weather/64x64/day/176.png" alt="weather icon" />
          <p>Temp: 18.17 °C</p>
          <p>Wind: 18.17 M/S</p>
          <p>Humidity: 76 %</p>
        </div>
        <div className={styles["each-day-weather"]}>
          <h3>2023-06-19</h3>
          <img src="https://cdn.weatherapi.com/weather/64x64/day/176.png" alt="weather icon" />
          <p>Temp: 18.17 °C</p>
          <p>Wind: 18.17 M/S</p>
          <p>Humidity: 76 %</p>
        </div>
        <div className={styles["each-day-weather"]}>
          <h3>2023-06-19</h3>
          <img src="https://cdn.weatherapi.com/weather/64x64/day/176.png" alt="weather icon" />
          <p>Temp: 18.17 °C</p>
          <p>Wind: 18.17 M/S</p>
          <p>Humidity: 76 %</p>
        </div>
        <div className={styles["each-day-weather"]}>
          <h3>2023-06-19</h3>
          <img src="https://cdn.weatherapi.com/weather/64x64/day/176.png" alt="weather icon" />
          <p>Temp: 18.17 °C</p>
          <p>Wind: 18.17 M/S</p>
          <p>Humidity: 76 %</p>
        </div>

      </Carousel>


    </div>
  );
};

export default Result;
