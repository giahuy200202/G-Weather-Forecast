import React from "react";
import styles from "./navbar.module.css";

const Navbar: React.FC = () => {
  return (
    <nav className={styles["nav-container"]}>
      <h1>Weather Dashboard</h1>
    </nav>
  );
};

export default Navbar;
