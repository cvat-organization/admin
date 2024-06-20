import React, { useState } from "react";

const ModifyVendor: React.FC = () => {
  const [vendorId, setVendorId] = useState("");
  const [vendorData, setVendorData] = useState({ name: "", address: "" });

  const handleSearch = () => {
    // API call to get vendor details
    console.log("Fetching details for vendor ID:", vendorId);
    // Mock data
    setVendorData({ name: "Vendor Name", address: "Vendor Address" });
  };

  const handleSave = () => {
    // API call to save vendor details
    console.log("Saving vendor details:", vendorData);
  };

  return (
    <div>
      <h1>Modify Vendor</h1>
      <input
        type="text"
        value={vendorId}
        onChange={(e) => setVendorId(e.target.value)}
        placeholder="Enter vendor ID"
      />
      <button onClick={handleSearch}>Fetch Details</button>

      {vendorData && (
        <div>
          <input
            type="text"
            value={vendorData.name}
            onChange={(e) =>
              setVendorData({ ...vendorData, name: e.target.value })
            }
            placeholder="Vendor Name"
          />
          <input
            type="text"
            value={vendorData.address}
            onChange={(e) =>
              setVendorData({ ...vendorData, address: e.target.value })
            }
            placeholder="Vendor Address"
          />
          <button onClick={handleSave}>Save</button>
        </div>
      )}
    </div>
  );
};

export default ModifyVendor;
