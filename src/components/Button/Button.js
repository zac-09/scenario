import styles from "./button.module.css";

const Button = (props) => {
  return (
    <div
      className={`${styles["btn-container"]} ${props.style}`}
      onClick={props.onClick}
    >
      <a href="#" className={styles["btn"]}>
        {props.label}
      </a>
    </div>
  );
};

export default Button;
