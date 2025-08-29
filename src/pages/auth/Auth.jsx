import { useState } from "react";
import styles from "./Auth.module.css";
import ForgetPasswordImage from "../../assets/images/ForgetPasswordImage.svg";
import LoginImage from "../../assets/images/LoginImage.svg";
import LoginSmallImage from "../../assets/images/LoginSmallImage.svg";
import NewPasswordImage from "../../assets/images/NewPasswordImage.svg";
import OtpImage from "../../assets/images/OtpImage.svg";

const Auth = () => {
  const [authStep, setAuthStep] = useState("login");

  const rightPanelComponents = {
    login: <img src={LoginImage} alt="Login" />,
    sendOtp: <img src={ForgetPasswordImage} alt="Forget Password" />,
    verifyOtp: <img src={OtpImage} alt="OTP" />,
    resetPassword: <img src={NewPasswordImage} alt="New Password" />,
  };

  const renderForm = () => {
    switch (authStep) {
      case "login":
        return (
          <>
            <h2 className={styles.title}>Log in to your account</h2>
            <p className={styles.subtitle}>
              Welcome back! Please enter your details.
            </p>

            <form className={styles.form}>
              <div className={styles.lableContainer}>
                <label>Email</label>
                <input
                  type="email"
                  placeholder="Example@email.com"
                  className={styles.input}
                />
              </div>

              <div className={styles.lableContainer}>
                <label>Password</label>
                <input
                  type="password"
                  placeholder="at least 8 characters"
                  className={styles.input}
                />
              </div>

              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setAuthStep("sendOtp");
                }}
                className={styles.forgotPassword}
              >
                Forgot Password?
              </a>

              <button type="submit" className={styles.signInBtn}>
                Sign in
              </button>
            </form>

            <p className={styles.footerText}>
              Don’t you have an account?{" "}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setAuthStep("signup");
                }}
                className={styles.signUp}
              >
                Sign up
              </a>
            </p>
          </>
        );

      case "signup":
        return (
          <>
            <h2 className={styles.title}>Create an account</h2>
            <p className={styles.subtitle}>Start inventory management.</p>

            <form className={styles.form}>
              <div className={styles.lableContainer}>
                <label>Name</label>
                <input
                  type="text"
                  placeholder="Name"
                  className={styles.input}
                />
              </div>

              <div className={styles.lableContainer}>
                <label>Email</label>
                <input
                  type="email"
                  placeholder="Example@email.com"
                  className={styles.input}
                />
              </div>

              <div className={styles.lableContainer}>
                <label>Create Password</label>
                <input
                  type="password"
                  placeholder="at least 8 characters"
                  className={styles.input}
                />
              </div>

              <div className={styles.lableContainer}>
                <label>Confirm Password</label>
                <input
                  type="password"
                  placeholder="at least 8 characters"
                  className={styles.input}
                />
              </div>

              <button type="submit" className={styles.signInBtn}>
                Sign up
              </button>
            </form>

            <p className={styles.footerText}>
              Already have an account?{" "}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setAuthStep("login");
                }}
                className={styles.signUp}
              >
                Sign in
              </a>
            </p>
          </>
        );

      case "sendOtp":
        return (
          <>
            <h2 className={styles.title}>Company name</h2>
            <p className={styles.subtitle}>
              Please enter your registered email ID to receive an OTP
            </p>

            <form className={styles.form}>
              <div className={styles.lableContainer}>
                <label>E-mail</label>
                <input
                  type="email"
                  placeholder="Enter your registered email"
                  className={styles.input}
                />
              </div>

              <button
                type="button"
                onClick={() => setAuthStep("verifyOtp")}
                className={styles.signInBtn}
              >
                Send Mail
              </button>
            </form>
          </>
        );

      case "verifyOtp":
        return (
          <>
            <h2 className={styles.title}>Enter Your OTP</h2>
            <p className={styles.subtitle}>
              We’ve sent a 6-digit OTP to your registered mail. Please enter it
              below to sign in.
            </p>

            <form className={styles.form}>
              <div className={styles.lableContainer}>
                <label>OTP</label>
                <input
                  type="text"
                  placeholder="xxxx05"
                  className={styles.input}
                />
              </div>

              <button
                type="button"
                onClick={() => setAuthStep("resetPassword")}
                className={styles.signInBtn}
              >
                Confirm
              </button>
            </form>
          </>
        );

      case "resetPassword":
        return (
          <>
            <h2 className={styles.title}>Create New Password</h2>
            <p className={styles.subtitle}>
              Today is a new day. It's your day. You shape it. Sign in to start
              managing your projects.
            </p>

            <form className={styles.form}>
              <div className={styles.lableContainer}>
                <label>Enter New Password</label>
                <input
                  type="password"
                  placeholder="at least 8 characters"
                  className={styles.input}
                />
              </div>

              <div className={styles.lableContainer}>
                <label>Confirm Password</label>
                <input
                  type="password"
                  placeholder="at least 8 characters"
                  className={styles.input}
                />
              </div>

              <button type="submit" className={styles.signInBtn}>
                Reset Password
              </button>
            </form>

            <a
              href="#"
              className={styles.forgotPassword}
              onClick={(e) => {
                e.preventDefault();
                setAuthStep("login");
              }}
            >
              Back to Login
            </a>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      {/* Left Panel */}
      <div className={styles.leftPanel}>
        <div className={styles.formWrapper}>{renderForm()}</div>
      </div>

      {/* Right Panel (kept same UI) */}
      <div className={styles.rightPanel}>
        <div className={styles.rightContent}>
          {(authStep === "login" || authStep === "signup") && (
            <div className={styles.rightUpper}>
              <div>
                <h1 className={styles.welcome}>Welcome to</h1>
                <h1 className={styles.company}>Shopfinity</h1>
              </div>
              <img src={LoginSmallImage} alt="login" />
            </div>
          )}
          {rightPanelComponents[authStep] || rightPanelComponents.login}
        </div>
      </div>
    </div>
  );
};

export default Auth;
