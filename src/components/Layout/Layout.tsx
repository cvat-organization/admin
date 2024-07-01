import React, { useState, useEffect } from "react";
import Navbar from "../navbar/Navbar";
import { Outlet } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Layout.css";
import Sidebar from "../sidebar/sidebar";
import { menu } from "../../data"; // Import menu directly from data.ts

const queryClient = new QueryClient();

const Layout: React.FC = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
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
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 401) {
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
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
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

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  return (
    <div className="main">
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="contentContainer">
        <div className={`container1 ${sidebarExpanded ? 'expanded' : 'contracted'}`}>
          <Sidebar expanded={sidebarExpanded} />
          {/* Content for container 1 */}
        </div>
        <div className="container2">
          <QueryClientProvider client={queryClient}>
            {/* Content for container 2 */}
            <Outlet />
          </QueryClientProvider>
        </div>
      </div>
    </div>
  );
};

export default Layout;
