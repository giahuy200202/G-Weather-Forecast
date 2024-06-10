import React from "react";
import styles from "./search.module.css";
import { useAppDispatch, useAppSelector } from "../../../hooks/ReduxHooks";
import BeatLoader from "react-spinners/BeatLoader";
import toast, { Toaster } from "react-hot-toast";
import { ReactComponent as EmailIcon } from "../../../assets/svg/email.svg";

import { dashboardActions } from "@store/dashboard";
import { useState } from "react";

const Search: React.FC = () => {
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState('');

  // const chartData = useAppSelector((state) => state.dashboard.chartData);
  
  const handleSearchChange = (event: any) => {
      setSearch(event.target.value);
  };

  const handleSearchKeyEnter = (event: any) => {
    if (event.key === 'Enter') {
      handleSubmitSearch();
    }
  }

  const handleSubmitSearch = () => {
    console.log(search);
  }

  return (
    <div className={styles["search-container"]}>
      <div className={styles["search-header"]}>
        <h2>Enter a city name</h2>
      </div>
      <input onKeyDown={handleSearchKeyEnter} onChange={handleSearchChange} type="text" placeholder="E.g., New York, London, Tokyo" />
      <button onClick={handleSubmitSearch} className={styles["btn-search"]}>Search</button>
      <div className={styles["or-container"]}>
        <div className={styles["line"]}></div>
        <p>or</p>
        <div className={styles["line"]}></div>
      </div>
      <button className={styles["btn-current-location"]}>Use current location</button>
      <button className={`${styles["btn-current-location"]} ${styles["btn-more-margin"]}`}>Receive daily forecast via email</button>
    </div>
  );
};

export default Search;
