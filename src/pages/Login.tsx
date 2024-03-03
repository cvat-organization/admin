import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Login.css";


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
          localStorage.setItem('jwt', data.token);
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
    <div className="Login-container">
      <div className="Picture-Form-container">
        <div className="form-container">
            <h2>Login</h2>
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
            <br></br>
            <span>
              Forgot your <Link to ="/forgotPassword">Password?</Link>
            </span>
            <ToastContainer />
          </div>
    <div className="picture-container">
      <img src={require("./Images/i.jpg")} alt="Login illustration" />
    </div>
  </div>
  </div>
  );
}

export default Login;

