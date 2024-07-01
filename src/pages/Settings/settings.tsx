import React from "react";
import { useNavigate } from "react-router-dom";
import "./settings.css"; // Import CSS file for component-specific styles

const SettingsPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="settings-container">
      <h2 className="settings-title">Settings</h2>
      <button
        className="settings-button"
        onClick={() => navigate("/users/view")}
      >
        View Users
      </button>
      <button
        className="settings-button"
        onClick={() => navigate("/vendor/onboarding")}
      >
        Vendor Page
      </button>
      <button
        className="settings-button"
        onClick={() => navigate("/activities")}
      >
        Activity Page
      </button>
    </div>
  );
};

export default SettingsPage;