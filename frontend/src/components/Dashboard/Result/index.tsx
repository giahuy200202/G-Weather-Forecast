import React from "react";
import styles from "./result.module.css";
import { useAppDispatch, useAppSelector } from "../../../hooks/ReduxHooks";
import BeatLoader from "react-spinners/BeatLoader";
import toast, { Toaster } from "react-hot-toast";
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
