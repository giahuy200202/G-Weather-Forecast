import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "@components/Navbar";
import styles from "./layout.module.css";
import { Toaster } from 'react-hot-toast';

const BaseLayout: React.FC = () => {
  return (
    <div className={styles["base-layout-container"]}>
      <div className={styles["content-container"]}>
        <Navbar />
        <Outlet />
      </div>
      <Toaster position="top-right"/>
    </div>
  );
};

export default BaseLayout;
