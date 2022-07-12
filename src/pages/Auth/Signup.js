import { useInput } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./auth.module.css";
import { useHistory } from "react-router-dom";
import { signup } from "../../store/actions/auth";
import FormButton from "../../components/FormButton/FormButton";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

function Signup() {
  const [loading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const validateEmail = (email) => email.trim() !== "" && email.includes("@");
  const validatePassword = (password) =>
    password.trim() !== "" && password.length >= 8;
  const validateName = (name) => name.trim() !== "";
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
  const {
    value: lastnameValue,
    hasError: lastnameHasError,
    inputBlurHandler: lastnameInputBlurHandler,
    valueChangeHandler: lastnameValueChangeHandler,

    isValid: lastnameIsValid,
  } = useInput(validateName);
  const {
    value: firstnameValue,
    hasError: firstnameHasError,
    inputBlurHandler: firstnameInputBlurHandler,
    valueChangeHandler: firstnameValueChangeHandler,

    isValid: firstnameIsValid,
  } = useInput(validateName);
  const onSignUp = async (event) => {
    event.preventDefault();

    let formIsValid =
      emailIsValid && passwordIsValid && lastnameIsValid && firstnameIsValid;
    if (!formIsValid) {
      return;
    }
    setIsLoading(true);

    try {
      dispatch(
        signup(emailValue, passwordValue, lastnameValue, firstnameValue)
      );
      setIsLoading(false);

      history.push("/");
    } catch (err) {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <form onSubmit={onSignUp} className={styles["form"]}>
        <div className={styles["input__group"]}>
          <div className={styles["input__container"]}>
            <input
              type="text"
              className={`${styles["input"]} ${styles["firstname"]}`}
              placeholder="First Name"
              required
              value={firstnameValue}
              onChange={firstnameValueChangeHandler}
              onBlur={firstnameInputBlurHandler}
            />
            {firstnameHasError && (
              <span className={styles["error"]}>
                Please provide a first name
              </span>
            )}
          </div>

          <div className={styles["input__container"]}>
            <input
              type="text"
              className={`${styles["input"]} ${styles["lastname"]}`}
              placeholder="Last Name"
              required
              value={lastnameValue}
              onChange={lastnameValueChangeHandler}
              onBlur={lastnameInputBlurHandler}
            />
            {lastnameHasError && (
              <span className={styles["error"]}>
                Please provide a last name
              </span>
            )}
          </div>
        </div>
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
          //   label="sign up"
          //   onClick={onSignUp}
          //   // type="submit"
          // />
          <FormButton title="sign up" style={styles["btn"]} />
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

export default Signup;
