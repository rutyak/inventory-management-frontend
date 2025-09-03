import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import FormLayout from "../FormLayout";
import FormField from "../FormField";
import styles from "../Auth.module.css";

const base_url = import.meta.env.VITE_APP_BASE_URL;

function SendOtp({ setAuthStep, otpEmail, setOtpEmail }) {
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOtpEmail((prev) => ({ ...prev, [name]: value }));
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!otpEmail.email) {
      toast.error("Please enter your registered email");
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post(`${base_url}/send-otp`, {
        email: otpEmail.email,
      });
      toast.success(res.data.message || "OTP sent to your email!");
      setAuthStep("verifyOtp");
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to send OTP!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormLayout
      title="Forgot Password"
      subtitle="Please enter your registered email ID to receive an OTP"
    >
      <FormField
        type="email"
        label="E-mail"
        placeholder="Enter your registered email"
        name="email"
        value={otpEmail.email}
        onChange={handleChange}
      />
      <button
        type="button"
        className={styles.signInBtn}
        disabled={loading}
        onClick={handleSendOtp}
      >
        {loading ? "Sending..." : "Send Mail"}
      </button>
    </FormLayout>
  );
}

export default SendOtp;
