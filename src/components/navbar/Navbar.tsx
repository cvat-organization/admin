import React, { useState, useEffect } from "react";
import "./navbar.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface UserProfile {
  fullName: string;
  profilePicture: string;
}

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get<UserProfile>("http://localhost:4000/profile/get-user-profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        });
        console.log("User profile:", response.data);
        setUserProfile(response.data);
        // Store user profile in local storage
        localStorage.setItem("userProfile", JSON.stringify(response.data));
      } catch (error: any) {
        console.error("Error fetching user profile:", error.message);
        if (error.response && error.response.status === 401) {
          toast.error("Unauthenticated token / Session not found");
        } else {
          toast.error("An unexpected error occurred");
        }
        // Do not navigate to login on error
      }
    };

    // Check if user profile is already in local storage
    const storedUserProfile = localStorage.getItem("userProfile");
    if (storedUserProfile) {
      setUserProfile(JSON.parse(storedUserProfile));
    } else {
      fetchUserProfile();
    }
  }, []);

  const handleProfileClick = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const viewProfile = () => {
    navigate("/profile");
  };

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
    } catch (error: any) {
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
    <div className="navbar">
      <div className="logo">
        <button onClick={toggleSidebar} className="sidebar-toggle">
          <img src="/toggle-menu.svg" alt="Toggle Sidebar" />
        </button>
        <img src="logo.svg" alt="" />
        <span>ⓐⓒⓣⓘⓥⓞ</span>
      </div>
      <div className="icons">
        <div className="user">
          {userProfile && (
            <>
              <span>{userProfile.fullName}</span>
              <button onClick={handleProfileClick} className="profile-button">
                <img src={`data:image/jpeg;base64,${userProfile.profilePicture}`} alt="" className="icon" />
              </button>
              {isProfileDropdownOpen && (
                <div className="profile-dropdown">
                  <button onClick={viewProfile}>View Profile</button>
                  <button onClick={logOut}>Logout</button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
