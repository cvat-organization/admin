import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./SignUp.css";

function Register() {
  const [values, setValues] = useState({
    fullName: "",
    displayName: "",
    phoneNo: "",
    email: "",
    password: "",
    userType: "Superuser", // Default user type
  });

  const navigate = useNavigate();
  const generateError = (error: string) =>
    toast.error(error, {
      position: "bottom-right",
    });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/auth/register", // Endpoint for registration
        { ...values }, // Request body containing user data
        { withCredentials: true } // Include credentials for cross-origin requests
      );
      console.log(data);
      if (data) {
        toast.success(data.message, {
          position: "bottom-right",
        });
        navigate("/login");
        // Optionally, redirect user to login page after successful registration
        // history.push("/login");
      }
    } catch (ex: any) {
      if (ex.response && ex.response.data && ex.response.data.message) {
        generateError(ex.response.data.message);
      } else {
        generateError("An unexpected error occurred.");
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <div className="Register-main-container">
      <div className="Register-picture-container">
        <img src={require("./Admin-pic.png")} alt="Background" />
        <div className="Register-form-overlay">
          <div className="Register-form-container">
            <h2>ⓐⓒⓣⓘⓥⓞ</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="fullName"></label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={values.fullName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="displayName"></label>
                <input
                  type="text"
                  name="displayName"
                  placeholder="Display Name"
                  value={values.displayName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="phoneNo"></label>
                <input
                  type="text"
                  name="phoneNo"
                  placeholder="Phone Number"
                  value={values.phoneNo}
                  onChange={handleChange}
                  required
                />
              </div>
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
                  name="password"
                  placeholder="Password"
                  value={values.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="Register-button">
                Register
              </button>
              <span>
                Already have an account ?<Link to="/login">Login</Link>
              </span>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Register;
