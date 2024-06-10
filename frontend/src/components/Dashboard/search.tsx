import React from "react";
import styles from "./dashboard.module.css";
import { useAppDispatch, useAppSelector } from "../../hooks/ReduxHooks";
import BeatLoader from "react-spinners/BeatLoader";
import toast, { Toaster } from "react-hot-toast";
import { ReactComponent as Info } from "../../assets/svg/Dashboard/info.svg";
import { ReactComponent as RevenueSignature } from "../../assets/svg/Dashboard/revenuesign.svg";

import { dashboardActions } from "@store/dashboard";
import { useEffect } from "react";

const Chart: React.FC = () => {
  const dispatch = useAppDispatch();
  // const chartData = useAppSelector((state) => state.dashboard.chartData);

  return (
    <div className={styles["chart-container"]}>
     
    </div>
  );
};

export default Chart;
