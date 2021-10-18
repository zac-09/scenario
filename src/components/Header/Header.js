import { Fragment } from "react";
import styles from "./Header.module.css";
import photoPlaceHolder from "./../../assets/placeholder.png";
import sprite from "./../../assets/sprite.svg";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/actions/auth";
import { useHistory } from "react-router-dom";
const Header = (props) => {
  const userData = useSelector((state) => state.auth.user);
  const history = useHistory();
  const dispatch = useDispatch();
  const logoutHandler = async () => {
    await dispatch(logout());
    history.push("/");
  };

  return (
    <Fragment>
      <header className={styles["header"]}>
        {/* <img src={logo} alt="header logo" className={styles["header__logo"]} /> */}
        {props.select && <div>{props.select}</div>}

        <h2 className={styles["header__heading"]}>
          {props.title}
          {props.device_imei && (
            <span className={styles["header__heading--device-name"]}>
              {`(${props.device_imei ? props.device_imei : ""})`}
            </span>
          )}
        </h2>
        <div className={styles["header__user-nav"]}>
          <div className={styles["header__user-nav--icon-box"]}>
            <svg className={styles["header__user-nav--icon"]}>
              <use href={`${sprite}#icon-message`}></use>
            </svg>
            <span className={styles["header__user-nav--notification"]}>0</span>
          </div>
          <div className={styles["header__user-nav--icon-box"]}>
            <svg className={styles["header__user-nav--icon"]}>
              <use href={`${sprite}#icon-bell `}></use>
            </svg>
            <span className={styles["header__user-nav--notification"]}>0</span>
          </div>
          <div
            className={styles["header__user-nav--icon-box"]}
            onClick={logoutHandler}
          >
            <svg
              className={`${styles["header__user-nav--icon"]} ${styles["icon-red"]}`}
            >
              <use href={`${sprite}#icon-switch `}></use>
            </svg>
          </div>

          <div className={styles["header__user-nav--user-nav"]}>
            <img
              className={styles["header__user-nav--user-photo"]}
              src={userData.photo ? userData.photo : photoPlaceHolder}
              alt="header user"
            />
            <span class={styles["header__user-nav--user-name"]}>
              {userData.first_name}
            </span>
            <div className={styles["header__user--button"]}></div>
          </div>
        </div>
      </header>
    </Fragment>
  );
};

export default Header;
