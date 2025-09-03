import { useState } from "react";
import styles from "./Auth.module.css";
import ForgetPasswordImage from "../../assets/images/ForgetPasswordImage.svg";
import LoginImage from "../../assets/images/LoginImage.svg";
import LoginSmallImage from "../../assets/images/LoginSmallImage.svg";
import NewPasswordImage from "../../assets/images/NewPasswordImage.svg";
import OtpImage from "../../assets/images/OtpImage.svg";

import Login from "./login/Login";
import Signup from "./signup/Signup";
import SendOtp from "./sendOtp/SendOtp";
import VerifyOtp from "./verifyOtp/VerifyOtp";
import ResetPassword from "./resetPassword/ResetPassword";

const Auth = () => {
  const [authStep, setAuthStep] = useState("login");
  const [otpEmail, setOtpEmail] = useState({ email: "" });

  const rightPanelComponents = {
    login: <img src={LoginImage} alt="Login" />,
    sendOtp: <img src={ForgetPasswordImage} alt="Forget Password" />,
    verifyOtp: <img src={OtpImage} alt="OTP" />,
    resetPassword: <img src={NewPasswordImage} alt="New Password" />,
  };

  const forms = {
    login: <Login setAuthStep={setAuthStep} />,

    signup: <Signup setAuthStep={setAuthStep} />,

    sendOtp: (
      <SendOtp
        setAuthStep={setAuthStep}
        otpEmail={otpEmail}
        setOtpEmail={setOtpEmail}
      />
    ),

    verifyOtp: (
      <VerifyOtp
        setAuthStep={setAuthStep}
        otpEmail={otpEmail}
        setOtpEmail={setOtpEmail}
      />
    ),

    resetPassword: (
      <ResetPassword setAuthStep={setAuthStep} otpEmail={otpEmail} />
    ),
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftPanel}>
        <div className={styles.formWrapper}>{forms[authStep]}</div>
      </div>

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
