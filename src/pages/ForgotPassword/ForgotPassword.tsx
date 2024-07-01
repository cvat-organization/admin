import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import "./ForgotPassword.css";

interface FormValues {
  email: string;
  userType: string;
}

function ForgotPassword() {
  const [values, setValues] = useState<FormValues>({
    email: "",
    userType: "Superuser", // Default user type
  });
  

  const [showOTPField, setShowOTPField] = useState(false); // State to track whether OTP field should be displayed
  const [otpValue, setOtpValue] = useState(""); // State to store OTP value
  const navigate = useNavigate();

  const generateError = (error: string) => {
    toast.error(error, {
      position: "bottom-right",
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/auth/account/request-otp", // Endpoint for forgot password
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

const handleOTPSubmit = async (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  try {
    // Make API call to verify OTP
    const { data } = await axios.post(
      "http://localhost:4000/auth/account/verify-otp",
      { email: values.email, userType: values.userType, otp: otpValue },
      { withCredentials: true }
    );
    if (data && data.token) {
      // Redirect user to a new password page or perform necessary actions
      localStorage.setItem("token", data.token);
      navigate("/newpassword");
    }
  } catch (error:any) {
    if (error.response && error.response.data && error.response.data.message) {
      generateError(error.response.data.message);
    } else {
      generateError("An unexpected error occurred.");
    }
  }
};

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleOTPChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOtpValue(e.target.value);
  };

  return (
    <div className="ForgotPassword-main-container">
      <div className="ForgotPassword-picture-container">
        <img src={require("./Admin-pic.png")} alt="ForgotPassword illustration" />
        <div className="ForgotPassword-form-overlay">
          <div className="ForgotPassword-form-container">
            <h1>ⓐⓒⓣⓘⓥⓞ</h1>
            <form onSubmit={handleSubmit}>
              {showOTPField ? (
                <div>
                  <label></label>
                  <p>{values.email}</p>
                </div>
              ) : (
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
              )}
              {!showOTPField && <button type="submit">Submit</button>}
            </form>
            {showOTPField && (
              <form onSubmit={handleOTPSubmit}>
                <div>
                  <label htmlFor="otp"></label>
                  <input
                    type="text"
                    name="otp"
                    placeholder="OTP"
                    value={otpValue}
                    onChange={handleOTPChange}
                    required
                  />
                </div>
                <button type="submit">Verify OTP</button>
              </form>
            )}
            <ToastContainer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
