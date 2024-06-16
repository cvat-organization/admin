import React, { useState } from "react";
import "./update_vendor.css";

const UpdateVendor: React.FC = () => {
  const [vendorId, setVendorId] = useState<number>(1); // Example vendorId
  const [vendorName, setVendorName] = useState<string>("Vendor A"); // Example vendorName
  const [contactEmail, setContactEmail] =
    useState<string>("vendor@example.com"); // Example contact email
  const [products, setProducts] = useState<string[]>([
    "Product A",
    "Product B",
  ]); // Example products

  const handleVendorNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVendorName(e.target.value);
  };

  const handleContactEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContactEmail(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Replace with actual update logic (e.g., API call)
    console.log("Updating vendor:", {
      vendorId,
      vendorName,
      contactEmail,
      products,
    });
    // Example API call:
    // fetch('/api/updateVendor', {
    //   method: 'PUT',
    //   body: JSON.stringify({ vendorId, vendorName, contactEmail, products }),
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // }).then(response => response.json())
    //   .then(data => {
    //     console.log('Update successful:', data);
    //     // Handle success state or navigation
    //   })
    //   .catch(error => {
    //     console.error('Update failed:', error);
    //     // Handle error state
    //   });
  };

  return (
    <div className="vendor-update-container">
      <div className="vendor-form">
        <h2>Update Vendor Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="vendorId">Vendor ID</label>
            <input type="text" id="vendorId" value={vendorId} readOnly />
          </div>
          <div className="form-group">
            <label htmlFor="vendorName">Vendor Name</label>
            <input
              type="text"
              id="vendorName"
              value={vendorName}
              onChange={handleVendorNameChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="contactEmail">Contact Email</label>
            <input
              type="email"
              id="contactEmail"
              value={contactEmail}
              onChange={handleContactEmailChange}
              required
            />
          </div>
          <button type="submit">Update Vendor</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateVendor;
