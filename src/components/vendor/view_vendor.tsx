import React from "react";
import "./view_vendor.css"; // Import CSS file for component-specific styles
import { useNavigate } from "react-router-dom";

interface Vendor {
  id: number;
  name: string;
  registrationDate: string; // New property for date of registration
}

const ViewVendor: React.FC = () => {
  const navigate = useNavigate();

  // Example vendor data with registration dates
  const vendors: Vendor[] = [
    { id: 1, name: "Vendor A", registrationDate: "2023-05-15" },
    { id: 2, name: "Vendor B", registrationDate: "2023-06-10" },
    { id: 3, name: "Vendor C", registrationDate: "2023-04-20" },
    { id: 4, name: "Vendor D", registrationDate: "2023-03-05" },
    { id: 5, name: "Vendor E", registrationDate: "2023-02-15" },
    { id: 6, name: "Vendor F", registrationDate: "2023-01-10" },
    { id: 7, name: "Vendor G", registrationDate: "2023-07-20" },
    { id: 8, name: "Vendor H", registrationDate: "2023-08-05" },
    { id: 9, name: "Vendor I", registrationDate: "2023-09-15" },
    { id: 10, name: "Vendor J", registrationDate: "2023-10-10" },
  ];

  const handleModify = (vendorId: number) => {
    // Handle modify action, e.g., navigate to modify page or show modal
    console.log(`Modify vendor with ID ${vendorId}`);
    // navigate to /vendor/modify
    navigate("/vendor/update");
  };

  return (
    <div className="simple-component-container">
      <h2 className="component-title">Vendor List</h2>
      <div className="table-container">
        <table className="vendor-table">
          <thead>
            <tr>
              <th>VENDOR_ID</th>
              <th>VENDOR_NAME</th>
              <th>DATE_OF_REGISTRATION</th> {/* New column header */}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {vendors.map((vendor) => (
              <tr key={vendor.id}>
                <td>{vendor.id}</td>
                <td>{vendor.name}</td>
                <td>{vendor.registrationDate}</td>{" "}
                {/* Display registration date */}
                <td>
                  <button onClick={() => handleModify(vendor.id)}>
                    Modify
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewVendor;
