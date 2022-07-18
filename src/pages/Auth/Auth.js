import styles from "./auth.module.css";
import drag from "./../../assets/drag.svg";
import Card from "../../components/Card/Card";
import useInput from "./../../hooks/use-input";
import { useState } from "react";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { useDispatch } from "react-redux";
import { login } from "../../store/actions/auth";
import { useHistory } from "react-router-dom";
import FormButton from "../../components/FormButton/FormButton";
import Signup from "./Signup";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";


const Auth = (props) => {


 
  const [isSignup, setIsSignup] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);

 

  return (
    <div className={styles["container"]}>
      <div className={styles["content"]}>
        <div className={styles["svg__container"]}>
          <p className={styles["into-text"]}>
            Join the world's best scenario creating app
          </p>
          <img src={drag} alt="illustration" className={styles["svg"]} />
        </div>
        <div className={styles["form__container"]}>
          <Card style={styles["card"]}>
            <div className={styles["auth__buble"]}>
              <div
                className={`${styles["auth-container"]} ${
                  !isSignup ? styles["active"] : ""
                }`}
                onClick={() => {
                  setIsSignup(false);
                }}
              >
                <span className={styles["signin"]}>Sign In</span>
              </div>
              <div
                className={`${styles["auth-container"]} ${
                  isSignup ? styles["active"] : ""
                }`}
                onClick={() => {
                  setIsSignup(true);
                }}
              >
                <span className={styles["signup"]}>Sign Up</span>
              </div>
            </div>
            {isSignup && !isForgotPassword && (
             <Signup />
            )}
            {!isSignup && (
            <Login />
            )}
            {isForgotPassword && (
             <ForgotPassword />
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Auth;
