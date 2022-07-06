import styles from "./auth.module.css";
import drag from "./../../assets/drag.svg";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";
import useInput from "./../../hooks/use-input";
import { useState } from "react";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { useDispatch } from "react-redux";
import { login, signup } from "../../store/actions/auth";
import { useHistory } from "react-router-dom";
import FormButton from "../../components/FormButton/FormButton";
const validateEmail = (email) => email.trim() !== "" && email.includes("@");
const validatePassword = (password) =>
  password.trim() !== "" && password.length >= 8;
const validateName = (name) => name.trim() !== "";

const Auth = (props) => {
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
  const [loading, setIsLoading] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const onSignIn = async (event) => {
    event.preventDefault();
    let formIsValid = emailIsValid && passwordIsValid;
    if (!formIsValid) {
      return;
    }
    setIsLoading(true);

    try {
      console.log("the email is ", emailValue, passwordValue);

      await dispatch(login(emailValue, passwordValue));
      history.push("/");
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
  };
  const onSignUp = async (event) => {
    event.preventDefault();

    let formIsValid =
      emailIsValid && passwordIsValid && lastnameIsValid && firstnameIsValid;
    if (!formIsValid) {
      return;
    }
    setIsLoading(true);

    try {
      await dispatch(
        signup(emailValue, passwordValue, lastnameValue, firstnameValue)
      );
      setIsLoading(false);

      history.push("/");
    } catch (err) {
      setIsLoading(false);
    }
  };

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
            )}
            {!isSignup && (
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
                    <a href="#" onClick={() => setIsForgotPassword(true)}>
                      Forgot password
                    </a>
                  </div>
                )}
                {loading && (
                  <div className={styles["spinner__container"]}>
                    <LoadingSpinner />
                  </div>
                )}
              </form>
            )}
            {isForgotPassword && (
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
                        Please enter your email address to recieve a password
                        reset link
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
                    <FormButton style={styles["btn"]} title="Send reset link" />
                  </div>
                )}
                {loading && (
                  <div className={styles["spinner__container"]}>
                    <LoadingSpinner />
                  </div>
                )}
              </form>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Auth;
