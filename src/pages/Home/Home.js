import Header from "../../components/Header/Header";
import styles from "./home.module.css";

import InfoTile from "../../components/InfoTile/InfoTile";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useEffect, useState } from "react";

const Home = (props) => {
  const [randomDigits, setRandomDigits] = useState({ totalScenarios: 0, testedScenarios: 0, completedScenarios: 0 });

  useEffect(() => {
    let randomDigitsInterval;
    randomDigitsInterval = setInterval(() => {
      setRandomDigits((prev) => ({
        ...prev,
        totalScenarios: prev.totalScenarios + Math.ceil(Math.random() * 10),
        testedScenarios: prev.testedScenarios + Math.ceil(Math.random() * 5),
        completedScenarios: prev.completedScenarios + Math.ceil(Math.random() * 2)
      }));
    }, 2000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(randomDigitsInterval);
  }, []);

  return (
    <div className={styles["container"]}>
      <div className={styles["content"]}>
        <div className={styles["tiles-container"]}>
          <InfoTile
            style={styles["tile-blue"]}
            text="total scenarios"
            figure={randomDigits.totalScenarios}
            icon="puzzle-piece"
          />
          <InfoTile
            style={styles["tile-teal"]}
            text="tested scenarios"
            figure={randomDigits.testedScenarios}
            icon="lab"
          />
          <InfoTile
            style={styles["tile-pink"]}
            text="completed scenarios"
            figure={randomDigits.completedScenarios}
            icon="checkmark2"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
