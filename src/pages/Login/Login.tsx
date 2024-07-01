// Login.tsx

import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

interface FormValues {
  email: string;
  password: string;
  userType: string;
}

function Login() {
  const [values, setValues] = useState<FormValues>({
    email: "",
    password: "",
    userType: "Superuser"
  });
  const navigate = useNavigate();

  const generateError = (error: string) => {
    toast.error(error, {
      position: "bottom-right"
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/auth/login",
        { ...values },
        { withCredentials: true }
      );

      if (data && data.token) {
        localStorage.setItem("jwt", data.token);
        navigate("/");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response && error.response.data && error.response.data.message) {
        generateError(error.response.data.message);
      } else {
        generateError("An unexpected error occurred.");
      }
    }
  };
  const handleSignUp = () => {
    // Navigate to the sign-up page
    navigate("/signup");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <div className="Login-main-container">
      <div className="Login-picture-container">
        <img src={require("./Admin-pic.png")} alt="Login illustration" />
        <div className="Login-form-overlay">
          <div className="Login-form-container">
            <h1>ⓐⓒⓣⓘⓥⓞ</h1>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email"></label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={values.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="password"></label>
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  required
                />
            <div className="Forgot-password-container">
                <span className="Forgot-password-link">
                    <Link to="/forgotPassword">Forgot Password?</Link>
                </span> 
            </div>            
              </div>
              <div className="Button-container">
                <button type="submit" className="Login-button">Login</button>
                <button type="button" className="Signup-button" onClick={handleSignUp}>Sign Up</button>
              </div>
            </form>
            <ToastContainer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
