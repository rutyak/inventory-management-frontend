import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import FormLayout from "../FormLayout";
import FormField from "../FormField";
import styles from "../Auth.module.css";

const base_url = import.meta.env.VITE_APP_BASE_URL;

function Signup({ setAuthStep }) {
  const [loading, setLoading] = useState(false);

  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (signupData.password !== signupData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`${base_url}/register`, signupData);
      toast.success(res.data.message || "Signup successful!");
      setAuthStep("login");
    } catch (err) {
      toast.error(err.response?.data?.error || "Signup failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormLayout
      title="Create an account"
      subtitle="Start inventory management."
      footer={
        <>
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
        </>
      }
    >
      <FormField
        label="Name"
        placeholder="Name"
        name="name"
        value={signupData.name}
        onChange={handleChange}
      />
      <FormField
        type="email"
        label="Email"
        placeholder="Example@email.com"
        name="email"
        value={signupData.email}
        onChange={handleChange}
      />
      <FormField
        type="password"
        label="Create Password"
        placeholder="at least 8 characters"
        name="password"
        value={signupData.password}
        onChange={handleChange}
      />
      <FormField
        type="password"
        label="Confirm Password"
        placeholder="at least 8 characters"
        name="confirmPassword"
        value={signupData.confirmPassword}
        onChange={handleChange}
      />
      <button
        type="submit"
        className={styles.signInBtn}
        disabled={loading}
        onClick={handleSignup}
      >
        {loading ? "Signing up..." : "Sign up"}
      </button>
    </FormLayout>
  );
}

export default Signup;
