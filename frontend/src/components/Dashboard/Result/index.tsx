import React from "react";
import styles from "./result.module.css";
import { useAppDispatch, useAppSelector } from "../../../hooks/ReduxHooks";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import BeatLoader from "react-spinners/BeatLoader";


const Result: React.FC = () => {

  const weatherData = useAppSelector((state) => state.dashboard.weather);
  const currentWeather = useAppSelector((state) => state.dashboard.currentWeather);
  const isLoading = useAppSelector((state) => state.dashboard.isLoading);

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
    isLoading ? <div className={styles["center-loader"]}>
      <BeatLoader
        color="#4263eb"
        margin={2}
        size={15}
        speedMultiplier={0.5}
      />
    </div> :
      <div className={styles["result-container"]}>
        <div className={styles["banner-container"]}>
          <div className={styles["title-container"]}>
            <div className={styles["title-banner"]}>
              <h1>{currentWeather.location}</h1>
              <h1>({currentWeather.date})</h1>
            </div>
            <p>Temparature: {currentWeather.temperature} °C</p>
            <p>Wind: {currentWeather.wind} M/S</p>
            <p>Humidity: {currentWeather.humidity} %</p>
          </div>
          <div className={styles["condition-container"]}>
            <img src={`https:${currentWeather.imgCondition}`} alt="weather icon" />
            <p>{currentWeather.textCondition}</p>
          </div>
        </div>
        <h1>4-Day Forecast</h1>

        <Carousel responsive={responsive} >
          {weatherData.map((weather, index) => (
            <div key={index} className={styles["each-day-weather"]}>
              <h3>{weather.date}</h3>
              <img src={`https:${weather.imgCondition}`} alt="weather icon" />
              <p>Temp: {weather.temperature} °C</p>
              <p>Wind: {weather.wind} M/S</p>
              <p>Humidity: {weather.humidity} %</p>
            </div>
          ))}
        </Carousel>

      </div>
  );
};

export default Result;
