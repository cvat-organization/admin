import React, { useState } from "react";

const ResetVendorPassword: React.FC = () => {
  const [vendorId, setVendorId] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleReset = () => {
    // API call to reset vendor password
    console.log("Resetting password for vendor ID:", vendorId);
    console.log("New password:", newPassword);
  };

  return (
    <div>
      <h1>Reset Vendor Password</h1>
      <input
        type="text"
        value={vendorId}
        onChange={(e) => setVendorId(e.target.value)}
        placeholder="Enter vendor ID"
      />
      <input
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder="Enter new password"
      />
      <button onClick={handleReset}>Reset Password</button>
    </div>
  );
};

export default ResetVendorPassword;
