import {useEffect} from "react";
import Menu from "../menu/Menu";
import Navbar from "../navbar/Navbar";
import { Outlet } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const queryClient = new QueryClient();


const Layout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const fetchHomepageData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/homepage", {
          headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        });
        if (response.status === 200) {
          toast.success(response.data.message, { theme: "dark" });
        }
      } catch (error:any) {
        if (error.response) {
          if (error.response.status === 401) {
            toast.error("Unauthenticated token / Session not found");
          } else {
            toast.error("An unexpected error occurred");
          }
        } else {
          toast.error("An unexpected error occurred");
        }
        navigate("/login"); // Use navigate for redirection
      }
    };

    if (localStorage.getItem("jwt")) {
      fetchHomepageData();
    } else {
      navigate("/login"); // Use navigate for redirection
    }
  }, [navigate]);

  const logOut = async () => {
    try {
      await axios.post(
        "http://localhost:4000/logout",
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        }
      );
      localStorage.removeItem("jwt");
      navigate("/login"); // Use navigate for redirection
    } catch (error:any) {
      if (error.response) {
        if (error.response.status === 401) {
          toast.error("Unauthenticated token / Session not found");
        } else {
          toast.error("An unexpected error occurred");
        }
      } else {
        toast.error("An unexpected error occurred");
      }
      navigate("/login"); // Use navigate for redirection
    }
  };
  return (
    <div className="main">
      {/* <Navbar /> */}
      <div className="container">
        <div className="menuContainer">
          <Menu />
        </div>
        <div className="contentContainer">
          <QueryClientProvider client={queryClient}>
            <Outlet />
          </QueryClientProvider>
        </div>
      </div>
    </div>
  );
};

export default Layout;
