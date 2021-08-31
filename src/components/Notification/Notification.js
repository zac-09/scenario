import Card from "./../Card/Card";
import styles from "./Notification.module.css";
import sprite from "./../../assets/sprite.svg";

const Notification = (props) => {
  const type = props.type;
  let bgColor;
  let icon;
  if (type === "success") {
    bgColor = "bg-success";
    icon = "check-circle";
  } else if (type === "error") {
    icon = "cancel-circle";
    bgColor = "bg-error";
  } else if (type === "info") {
    icon = "info";
    bgColor = "bg-info";
  } else if (type === "warning") {
    icon = "warning";
    bgColor = "bg-warning";
  } else {
    icon = "info";
    bgColor = "bg-info";
  }

  return (
    <Card styles={`${styles["card"]} ${styles[bgColor]} ${styles["exit"]}`}>
      <svg class={styles["close"]} onClick={props.onClose}>
        <use href={`${sprite}#icon-cross`}></use>
      </svg>
      <div className={styles["icon__container"]}>
        <svg class={styles["icon"]}>
          <use href={`${sprite}#icon-${icon}`}></use>
        </svg>
      </div>
      <div className={styles["content__container"]}>
        <span>{props.title}</span>
        <span style={{ fontSize: "1.4rem" }}> {props.message}</span>
      </div>
    </Card>
  );
};

export default Notification;
