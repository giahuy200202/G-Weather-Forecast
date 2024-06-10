import React from "react";
import styles from "./dashboard.module.css";
import { useAppDispatch, useAppSelector } from "../../hooks/ReduxHooks";
import BeatLoader from "react-spinners/BeatLoader";
import toast, { Toaster } from "react-hot-toast";
import { ReactComponent as Untick } from "../../assets/svg/Dashboard/untick.svg";
import { ReactComponent as Tick } from "../../assets/svg/Dashboard/tick.svg";
import { ReactComponent as Calendar } from "../../assets/svg/Dashboard/calendar.svg";
import { dashboardActions } from "@store/dashboard";

const Result: React.FC = () => {
  // const tasklistData = useAppSelector((state) => state.dashboard.tasklistData);
  const dispatch = useAppDispatch();


  return (
    <div className={styles["tasklist-container"]}>
      
    </div>
  );
};

export default Result;
