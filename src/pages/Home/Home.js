import Header from "../../components/Header/Header";
import styles from "./home.module.css";
import { NavLink } from "react-router-dom";
import sprite from "./../../assets/sprite.svg";
import InfoTile from "../../components/InfoTile/InfoTile";

const Home = (props) => {
  return (
    <div className={styles["container"]}>
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
      <div className={styles["content"]}>
        <Header />
        <div className={styles["tiles-container"]}>
          <InfoTile
            style={styles["tile-blue"]}
            text="total scenarios"
            figure="20"
            icon="puzzle-piece"
          />
          <InfoTile
            style={styles["tile-teal"]}
            text="tested scenarios"
            figure="15"
            icon="lab"
          />
          <InfoTile
            style={styles["tile-pink"]}
            text="completed scenarios"
            figure="5"
            icon="checkmark2"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
