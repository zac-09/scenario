import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import FormButton from "../../components/FormButton/FormButton";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import useInput from "../../hooks/use-input";
import { login } from "../../store/actions/auth";
import styles from "./auth.module.css";

function Login() {
  const [loading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();
  const validateEmail = (email) => email.trim() !== "" && email.includes("@");
  const validatePassword = (password) =>
    password.trim() !== "" && password.length >= 8;
  const {
    value: emailValue,
    hasError: emailHasError,
    inputBlurHandler: emailInputBlurHandler,
    valueChangeHandler: emailValueChangeHandler,

    isValid: emailIsValid,
  } = useInput(validateEmail);
  const {
    value: passwordValue,
    hasError: passwordHasError,
    inputBlurHandler: passwordInputBlurHandler,
    valueChangeHandler: passwordValueChangeHandler,

    isValid: passwordIsValid,
  } = useInput(validatePassword);

  const onSignIn = async (event) => {
    event.preventDefault();
    let formIsValid = emailIsValid && passwordIsValid;
    if (!formIsValid) {
      return;
    }
    setIsLoading(true);

    try {
      console.log("the email is ", emailValue, passwordValue);

      dispatch(login(emailValue, passwordValue));
      history.push("/");
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form action="" className={styles["form"]} onSubmit={onSignIn}>
        <div className={styles["input__group"]}>
          <div className={styles["input__container"]}>
            <input
              type="email"
              className={styles["input"]}
              placeholder="Email"
              required
              value={emailValue}
              onChange={emailValueChangeHandler}
              onBlur={emailInputBlurHandler}
            />
            {emailHasError && (
              <span className={styles["error"]}>
                Please provide a valid email
              </span>
            )}
          </div>
        </div>
        <div className={styles["input__group"]}>
          <div className={styles["input__container"]}>
            <input
              type="password"
              className={styles["input"]}
              placeholder="Password"
              required
              value={passwordValue}
              onChange={passwordValueChangeHandler}
              onBlur={passwordInputBlurHandler}
            />
            {passwordHasError && (
              <span className={styles["error"]}>
                Please provide a password longer than 8 characters
              </span>
            )}
          </div>
        </div>
        {!loading && (
          // <Button
          //   style={styles["btn"]}
          //   label={isSignup ? "sign up" : "sign in"}
          //   onClick={onSignIn}
          //   // type="submit"

          // />
          <div>
            <FormButton style={styles["btn"]} title="sign in" />
            {/* <a href="#" onClick={() => setIsForgotPassword(true)}>
              Forgot password
            </a> */}
          </div>
        )}
        {loading && (
          <div className={styles["spinner__container"]}>
            <LoadingSpinner />
          </div>
        )}
      </form>
    </div>
  );
}

export default Login;
