import styles from "./card.module.css";

const Card = (props) => {
  return (
    <div className={`${styles["container"]} ${props.style}`}>
      {props.children}
    </div>
  );
};

export default Card;
