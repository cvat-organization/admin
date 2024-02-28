import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

//Format for the form values
interface FormValues {
  email: string;
  password: string;
  userType: string; 
}

//Login function
function Login() {
  //Default User Values
  const [values, setValues] = useState<FormValues>({
    email: "",
    password: "",
    userType: "Superuser",
  });
  const navigate = useNavigate();

  //Function to generate error
  const generateError = (error: string) =>
    toast.error(error, {
      position: "bottom-right",
    });

    //Function to handle the submit
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      try {
        const { data } = await axios.post(
          "http://localhost:4000/login",
          { ...values },
          { withCredentials: true }
        );
        if (data && data.token) {
          navigate("/");
        }
      } catch (ex: any) {
        if (ex.response && ex.response.data && ex.response.data.message) {
          generateError(ex.response.data.message);
        } else {
          generateError("An unexpected error occurred.");
        }
      }
    };
    

  //Function to handle the change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  //Return the form
  return (
    <div className="container">
      <h2>Login to your Account</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={values.email}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={values.password}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <span>
          Don't have an account ?<Link to="/register"> Register </Link>
      </span>
      <ToastContainer />
    </div>
  );
}

export default Login;
