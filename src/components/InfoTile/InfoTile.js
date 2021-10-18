
import styles from "./infotile.module.css";
import sprite from "./../../assets/sprite.svg";
import Card from "./../Card/Card";

const InfoTile = (props) => {
  return (
    <Card style={`${[styles["card"]]} ${props.style} `}>
      <div className={styles["icon-container"]}>
        <svg class={styles["icon"]}>
          <use href={`${sprite}#icon-${props.icon}`}></use>
        </svg>
      </div>
      <div className={styles["figure-container"]}>{props.figure}</div>
      <div className={styles["text-container"]}> {props.text}</div>
    </Card>
  );
};

export default InfoTile;
