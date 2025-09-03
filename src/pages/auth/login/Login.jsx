import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import FormLayout from "../FormLayout";
import FormField from "../FormField";
import styles from "../Auth.module.css";
import { addUser } from "../../../utils/userSlice";

const base_url = import.meta.env.VITE_APP_BASE_URL;

function Login({ setAuthStep }) {
  const user = useSelector((state) => state);
  const [loading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${base_url}/login`, loginData, {
        withCredentials: true,
      });
      
      dispatch(addUser(res.data?.user));
      toast.success(res.data?.message || "Login successful!");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormLayout
      title="Log in to your account"
      subtitle="Welcome back! Please enter your details."
      footer={
        <>
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
        </>
      }
    >
      <FormField
        type="email"
        label="Email"
        placeholder="Example@email.com"
        name="email"
        value={loginData.email}
        onChange={handleChange}
      />
      <FormField
        type="password"
        label="Password"
        placeholder="at least 8 characters"
        name="password"
        value={loginData.password}
        onChange={handleChange}
      />
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
      <button
        type="submit"
        className={styles.signInBtn}
        disabled={loading}
        onClick={handleLogin}
      >
        {loading ? "Signing in..." : "Sign in"}
      </button>
    </FormLayout>
  );
}

export default Login;
