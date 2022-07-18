import Header from "../../components/Header/Header";
import styles from "./home.module.css";

import InfoTile from "../../components/InfoTile/InfoTile";
import Sidebar from "../../components/Sidebar/Sidebar";

const Home = (props) => {
  return (
    <div className={styles["container"]}>
      <div className={styles["content"]}>
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
