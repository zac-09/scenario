import React, { useState } from 'react'
import FormButton from '../../components/FormButton/FormButton'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'
import useInput from '../../hooks/use-input';
import styles from "./auth.module.css"
function ForgotPassword() {
    const [loading, setIsLoading] = useState(false);
    const validateEmail = (email) => email.trim() !== "" && email.includes("@");
    const {
        value: emailValue,
        hasError: emailHasError,
        inputBlurHandler: emailInputBlurHandler,
        valueChangeHandler: emailValueChangeHandler,
    
        isValid: emailIsValid,
      } = useInput(validateEmail);
  return (
    <div>
         <form action="" className={styles["form"]}>
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
    </div>
  )
}

export default ForgotPassword