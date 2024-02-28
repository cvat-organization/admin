import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Register() {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    phoneNo: "",
    email: "",
    password: "",
    userType: "Customer", // Default user type
  });

  const navigate = useNavigate();
  const generateError = (error:string) =>
    toast.error(error, {
      position: "bottom-right",
    });

  const handleSubmit = async (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/register", // Endpoint for registration
        { ...values }, // Request body containing user data
        { withCredentials: true } // Include credentials for cross-origin requests
      );
      if (data) {
        toast.success(data.message, {
          position: "bottom-right",
        });
        navigate("/login")
        // Optionally, redirect user to login page after successful registration
        // history.push("/login");
      }
    } catch (ex:any) {
      if (ex.response && ex.response.data && ex.response.data.message) {
        generateError(ex.response.data.message);
      } else {
        generateError("An unexpected error occurred.");
      }
    }
  };

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <div className="container">
      <h2>Register a New User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={values.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={values.lastName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="phoneNo">Phone Number</label>
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
          <label htmlFor="email">Email</label>
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
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={values.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
      <span>
          Already have an account ?<Link to="/login"> Login</Link>
     </span>
      <ToastContainer />
    </div>
  );
}

export default Register;
