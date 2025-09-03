import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import FormLayout from "../FormLayout";
import FormField from "../FormField";
import styles from "../Auth.module.css";

const base_url = import.meta.env.VITE_APP_BASE_URL;

function VerifyOtp({ setAuthStep, otpEmail }) {
  const [loading, setLoading] = useState(false);
  const [otpData, setOtpData] = useState({ email: otpEmail.email, otp: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOtpData((prev) => ({ ...prev, [name]: value }));
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    if (!otpData.otp) {
      toast.error("Please enter OTP");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`${base_url}/verify-otp`, otpData);
      toast.success(res.data.message || "OTP verified!");
      setAuthStep("resetPassword");
    } catch (err) {
      toast.error(err.response?.data?.error || "Invalid OTP!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormLayout
      title="Enter Your OTP"
      subtitle="We’ve sent a 6-digit OTP to your registered mail. Please enter it below to continue."
    >
      <FormField
        type="text"
        label="OTP"
        placeholder="xxxx05"
        name="otp"
        value={otpData.otp}
        onChange={handleChange}
      />
      <button
        type="button"
        className={styles.signInBtn}
        disabled={loading}
        onClick={handleVerifyOtp}
      >
        {loading ? "Verifying..." : "Confirm"}
      </button>
    </FormLayout>
  );
}

export default VerifyOtp;
