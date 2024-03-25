import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./NewPassword.css";

function NewPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const generateError = (error: string) => {
    toast.error(error, {
      position: "bottom-right",
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (password !== confirmPassword) {
        generateError("Passwords do not match.");
        return;
      }

      const token = localStorage.getItem("token");
      if (!token) {
        generateError("No token found.");
        return;
      }

      const response = await axios.post(
        "http://localhost:4000/auth/account/new-password",
        { password },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        toast.success(response.data.message, {
          position: "bottom-right",
        });
        navigate("/login");
      } else {
        generateError("An unexpected error occurred.");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response && error.response.data && error.response.data.message) {
        generateError(error.response.data.message);
      } else {
        generateError("An unexpected error occurred.");
      }
    }
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  return (
    <div className="NewPassword-main-container">
      <div className="NewPassword-picture-container">
        <img src={require("./Admin-pic.png")} alt="NewPassword illustration" />
        <div className="NewPassword-form-overlay">
          <div className="NewPassword-form-container">
            <h1>ⓐⓒⓣⓘⓥⓞ</h1>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="password"></label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your new password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="confirmPassword"></label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm your new password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  required
                />
              </div>
              <button type="submit">Change Password</button>
            </form>
            <ToastContainer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewPassword;
