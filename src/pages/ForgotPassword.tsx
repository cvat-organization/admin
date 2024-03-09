

import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

// Forgot Password function
function ForgotPassword() {
  const [values, setValues] = useState({
    email: "",
    userType: "Superuser", // Default user type
  });

  const [showOTPField, setShowOTPField] = useState(false); // State to track whether OTP field should be displayed

  const navigate = useNavigate();

  const generateError = (error: string) =>
    toast.error(error, {
      position: "bottom-right",
    });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/request-otp", // Endpoint for forgot password
        { ...values }, // Request body containing user data
        { withCredentials: true } // Include credentials for cross-origin requests
      );
      if (data) {
        toast.success(data.message, {
          position: "bottom-right",
        });
        setShowOTPField(true); // Set showOTPField to true if data is true
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
    <div className="container1">
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {showOTPField && ( // Conditionally render OTP field if showOTPField is true
        <div>
          <label htmlFor="otp">OTP</label>
          <input type="text" name="otp" />
          {/* You can add more OTP field related logic here */}
        </div>
      )}
      <Link to="/login">Login</Link>
      <ToastContainer />
    </div>
  );
}

export default ForgotPassword;
