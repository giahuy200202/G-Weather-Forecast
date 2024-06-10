import React from "react";
import styles from "./dashboard.module.css";

import Search from "../../components/Dashboard/Search/index";
import Tasklist from "../../components/Dashboard/Result/index";
import { useAppDispatch, useAppSelector } from "@hooks/ReduxHooks";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // useEffect(() => {
  //   axios
  //     .get(`${process.env.REACT_APP_API_URI}/dashboard`)
  //     .then((res) => {
  //       // dispatch(dashboardActions.updateRevenue(getRevenue));
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  return (
    <div className={styles["dashboard-container"]}>
      <div className={styles["content-container"]}>
        <div className={styles["search-container"]}> <Search /></div>
        <div className={styles["result-container"]}> <Tasklist /></div>
      </div>
    </div>
  );
};

export default Dashboard;
