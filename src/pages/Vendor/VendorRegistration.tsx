import React, { useState, useEffect } from "react";
import axios from "axios";
import "./VendorRegistration.css"; // Import CSS file for component-specific styles
import { useNavigate } from "react-router-dom";

interface Vendor {
  _id: string;
  fullName: string;
  email: string;
  phoneNo: string;
  businessAddress?: string;
  isActive: boolean;
}

const ViewVendor: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [newVendor, setNewVendor] = useState({
    fullName: "",
    displayName: "",
    phoneNo: "",
    email: "",
    password: "",
    userType: "Vendor",
  });

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/admin/vendor/get-vendor-details",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt")}`, // Get JWT token from local storage
            },
          }
        );

        if (response.status === 200) {
          if (Array.isArray(response.data.vendorsData)) {
            const vendorData = response.data.vendorsData.map((vendor: any) => ({
              _id: vendor._id,
              fullName: vendor.fullName || "",
              email: vendor.email || "",
              phoneNo: vendor.phoneNo || "",
              businessAddress: vendor.businessAddress || "",
              isActive: vendor.isActive || false,
            }));

            setVendors(vendorData);
          } else {
            console.error("Error: response.data.vendorsData is not an array");
          }
        } else {
          console.error("Error fetching vendor data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching vendor data:", error);
      }
    };

    fetchVendors();
  }, []);

  const handleModify = (vendorId: string) => {
    console.log(`Modify vendor with ID ${vendorId}`);
    // Placeholder for modify functionality
  };

  const handleCreateVendor = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/auth/register",
        { ...newVendor },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`, // Get JWT token from local storage
          },
        }
      );

      if (response.status === 201) {
        alert("Vendor created successfully");
        setIsModalOpen(false);
        setNewVendor({
          fullName: "",
          displayName: "",
          phoneNo: "",
          email: "",
          password: "",
          userType: "Vendor",
        });
        // Optionally, refresh the vendor list
      } else {
        console.error("Error creating vendor:", response.data.message);
      }
    } catch (error) {
      console.error("Error creating vendor:", error);
    }
  };

  const filteredVendors = vendors.filter(
    (vendor) =>
      vendor.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor._id.includes(searchQuery)
  );

  return (
    <div className="simple-component-container">
      <div className="header-container">
        <h2 className="component-title">Vendor List</h2>
        <button
          className="create-vendor-button"
          onClick={() => setIsModalOpen(true)}
        >
          Create Vendor
        </button>
      </div>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search vendors..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>
      <div className="table-container">
        <table className="vendor-table">
          <thead>
            <tr>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>PHONE</th>
              <th>ADDRESS</th>
              <th>STATUS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filteredVendors.map((vendor) => (
              <tr key={vendor._id}>
                <td>{vendor.fullName}</td>
                <td>{vendor.email}</td>
                <td>{vendor.phoneNo}</td>
                <td>{vendor.businessAddress}</td>
                <td>{vendor.isActive ? "Active" : "Inactive"}</td>
                <td>
                  <button onClick={() => handleModify(vendor._id)}>Modify</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span
              className="close-button"
              onClick={() => setIsModalOpen(false)}
            >
              &times;
            </span>
            <h2>Create New Vendor</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleCreateVendor();
              }}
            >
              <div className="form-group">
                <label>Full Name:</label>
                <input
                  type="text"
                  value={newVendor.fullName}
                  onChange={(e) =>
                    setNewVendor({ ...newVendor, fullName: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label>Display Name:</label>
                <input
                  type="text"
                  value={newVendor.displayName}
                  onChange={(e) =>
                    setNewVendor({ ...newVendor, displayName: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label>Phone Number:</label>
                <input
                  type="text"
                  value={newVendor.phoneNo}
                  onChange={(e) =>
                    setNewVendor({ ...newVendor, phoneNo: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="text"
                  value={newVendor.email}
                  onChange={(e) =>
                    setNewVendor({ ...newVendor, email: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label>Password:</label>
                <input
                  type="password"
                  value={newVendor.password}
                  onChange={(e) =>
                    setNewVendor({ ...newVendor, password: e.target.value })
                  }
                  required
                />
              </div>
              <button type="submit" className="create-button">
                Create
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewVendor;
