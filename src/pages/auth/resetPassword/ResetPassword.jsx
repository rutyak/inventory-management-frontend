import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import FormLayout from "../FormLayout";
import FormField from "../FormField";
import styles from "../Auth.module.css";

const base_url = import.meta.env.VITE_APP_BASE_URL;

function ResetPassword({ setAuthStep, otpEmail }) {
  const [loading, setLoading] = useState(false);
  const [resetData, setResetData] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setResetData((prev) => ({ ...prev, [name]: value }));
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (resetData.password !== resetData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`${base_url}/reset-password`, {
        email: otpEmail.email,
        password: resetData.password,
      });
      toast.success(res.data.message || "Password reset successful!");
      setAuthStep("login");
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to reset password!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormLayout
      title="Create New Password"
      subtitle="Enter your new password below."
    >
      <FormField
        type="password"
        label="Enter New Password"
        placeholder="at least 8 characters"
        name="password"
        value={resetData.password}
        onChange={handleChange}
      />
      <FormField
        type="password"
        label="Confirm Password"
        placeholder="at least 8 characters"
        name="confirmPassword"
        value={resetData.confirmPassword}
        onChange={handleChange}
      />
      <button
        type="submit"
        className={styles.signInBtn}
        disabled={loading}
        onClick={handleResetPassword}
      >
        {loading ? "Resetting..." : "Reset Password"}
      </button>
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
    </FormLayout>
  );
}

export default ResetPassword;
