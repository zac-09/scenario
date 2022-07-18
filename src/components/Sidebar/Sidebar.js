import React from 'react'
import { NavLink } from "react-router-dom";
import sprite from "./../../assets/sprite.svg";
import styles from "./Sidebar.module.css";

function Sidebar() {
  return (
    <div className={styles["sidebar"]}>
    <div className={styles["title-container"]}>
      <span className={styles["title"]}>Scenario creator</span>
    </div>
    <div className={styles["list-container"]}>
      <ul className={styles["list"]}>
        <li className={styles["list-item"]}>
          <NavLink
            activeClassName={styles["nav-item--active"]}
            className={styles["nav-item"]}
            to="/home"
            href="#"
          >
            <svg className={styles["list-icon"]}>
              <use href={`${sprite}#icon-dashboard`}></use>
            </svg>
            <span className={styles["list-title"]}>Dashboard</span>
          </NavLink>
        </li>
        <li className={styles["list-item"]}>
          <NavLink
            activeClassName={styles["nav-item--active"]}
            to="/scenario"
            className={styles["nav-item"]}
     
          >
            <svg className={styles["list-icon"]}>
              <use href={`${sprite}#icon-puzzle-piece`}></use>
            </svg>
            <span className={styles["list-title"]}>scenarios</span>
          </NavLink>
        </li>
        <li className={styles["list-item"]}>
          <NavLink
            activeClassName={styles["nav-item--active"]}
            to="/canvas"
            className={styles["nav-item"]}
     
          >
            <svg className={styles["list-icon"]}>
              <use href={`${sprite}#icon-puzzle-piece`}></use>
            </svg>
            <span className={styles["list-title"]}>Create canvas</span>
          </NavLink>
        </li>

        <li className={styles["list-item"]}>
          <NavLink
            activeClassName={styles["nav-item--active"]}
            to="/canvasScenarios"
            className={styles["nav-item"]}
     
          >
            <svg className={styles["list-icon"]}>
              <use href={`${sprite}#icon-puzzle-piece`}></use>
            </svg>
            <span className={styles["list-title"]}>Canvas scenarios</span>
          </NavLink>
        </li>

        <li className={styles["list-item"]}>
          <NavLink
            activeClassName={styles["nav-item--active"]} 
            className={styles["nav-item"]}
            to="/test"
            href="#"
          >
            <svg className={styles["list-icon"]}>
              <use href={`${sprite}#icon-lab`}></use>
            </svg>
            <span className={styles["list-title"]}>Test</span>
          </NavLink>
        </li>
      </ul>
    </div>
  </div>
  )
}

export default Sidebar