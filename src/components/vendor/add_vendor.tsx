import React, { useState } from "react";

const AddVendor: React.FC = () => {
  const [vendorData, setVendorData] = useState({ name: "", address: "" });

  const handleSave = () => {
    // API call to add new vendor
    console.log("Adding new vendor:", vendorData);
  };

  return (
    <div>
      <h1>Add New Vendor</h1>
      <input
        type="text"
        value={vendorData.name}
        onChange={(e) => setVendorData({ ...vendorData, name: e.target.value })}
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
      <button onClick={handleSave}>Add Vendor</button>
    </div>
  );
};

export default AddVendor;
