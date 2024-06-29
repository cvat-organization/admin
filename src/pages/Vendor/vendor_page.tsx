import React, { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
import "./vendor_page.css";
import { useNavigate } from "react-router-dom";

interface User {
  _id: string;
  isActive: boolean;
  fullName: string;
  displayName: string;
  phoneNo?: string;
  email: string;
  userType: string;
  isLoggedIn: boolean;
  profilePicture?: string;
  bio?: string;
  birthYear?: number;
  gender?: string;
  height?: number;
  weight?: number;
  location?: string;
  buisnessWebsite?: string;
  buisnessAddress?: string;
  serviceType?: string;
  stepLengthCM?: number;
  website?: string;
  createdAt: string;
  updatedAt: string;
  contactPersonName: string;
  contactPersonEmail: string;
  contactPersonPhoneNo: string;
  contactPersonDesignation: string;
  isContactPersonDecisionMaker: boolean;
}

const ViewVendor: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<Partial<User> | null>(null);
  const [isModifyModalOpen, setIsModifyModalOpen] = useState<boolean>(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [newVendor, setNewVendor] = useState<any>({
    businessName: "",
    businessDisplayName: "",
    businessEmail: "",
    businessContactNo: "",
    businessWebsite: "",
    businessAddress: "",
    businessDomain: "",
    subCategories: [],
    businessDescription: "",
    businessLogo: "",
    serviceType: "",
    contactPersonName: "",
    contactPersonEmail: "",
    contactPersonPhoneNo: "",
    contactPersonDesignation: "",
    isContactPersonDecisionMaker: false,
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/admin/vendor/get-vendor-details",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
          }
        );

        if (response.status === 200) {
          const usersData = response.data.usersData || response.data.vendorsData;

          if (Array.isArray(usersData)) {
            const formattedUserData = usersData.map((user: any) => ({
              _id: user._id,
              isActive: user.isActive,
              fullName: user.fullName,
              displayName: user.displayName,
              phoneNo: user.phoneNo,
              email: user.email,
              userType: user.userType,
              isLoggedIn: user.isLoggedIn,
              profilePicture: user.profilePicture,
              bio: user.bio,
              birthYear: user.birthYear,
              gender: user.gender,
              height: user.height,
              weight: user.weight,
              location: user.location,
              buisnessWebsite: user.buisnessWebsite,
              buisnessAddress: user.buisnessAddress,
                serviceType: user.serviceType,
              stepLengthCM: user.stepLengthCM,
              website: user.website,
              createdAt: new Date(user.createdAt).toISOString().split("T")[0],
              updatedAt: new Date(user.updatedAt).toISOString().split("T")[0],
              contactPersonName: user.contactPersonName,
              contactPersonEmail: user.contactPersonEmail,
              contactPersonPhoneNo: user.contactPersonPhoneNo,
              contactPersonDesignation: user.contactPersonDesignation,
              isContactPersonDecisionMaker: user.isContactPersonDecisionMaker,
            }));
            console.log(formattedUserData);
            setUsers(formattedUserData);
          } else {
            console.error("Error: response.data.usersData or response.data.vendorsData is not an array");
          }
        } else {
          console.error("Error fetching user data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleModify = (userId: string) => {
    const user = users.find((u) => u._id === userId);
    if (user) {
      setSelectedUser(user);
      setIsModifyModalOpen(true);
    }
  };

  const handleUpdateUser = async () => {
    try {
      const response = await axios.put(
        "http://localhost:4000/admin/users/update",
        { ...selectedUser },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );

      if (response.status === 200) {
        alert("User updated successfully");
        setIsModifyModalOpen(false);
        setSelectedUser(null);
      } else {
        console.error("Error updating user:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleCreateUser = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/admin/vendor/register",
        newVendor,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );

      if (response.status === 201) {
        alert("Vendor registered successfully");
        setIsCreateModalOpen(false);
        setNewVendor({
          businessName: "",
          businessDisplayName: "",
          businessEmail: "",
          businessContactNo: "",
          businessWebsite: "",
          businessAddress: "",
          businessDomain: "",
          subCategories: [],
          businessDescription: "",
          businessLogo: "",
          serviceType: "",
          contactPersonName: "",
          contactPersonEmail: "",
          contactPersonPhoneNo: "",
          contactPersonDesignation: "",
          isContactPersonDecisionMaker: false,
        });
      } else {
        console.error("Error creating vendor:", response.data.message);
      }
    } catch (error) {
      console.error("Error creating vendor:", error);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user._id.includes(searchQuery)
  );

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setNewVendor({
            ...newVendor,
            businessLogo: reader.result.toString(),
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="simple-component-container">
      <div className="header-container">
        <h2 className="component-title">Vendor List</h2>
        <button
          className="create-user-button"
          onClick={() => setIsCreateModalOpen(true)}
        >
          Create Vendor
        </button>
      </div>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>
      <div className="table-container">
        <table className="user-table">
          <thead>
            <tr>
              <th>Buisness Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>User Type</th>
                <th>Service Type</th>
              <th>Active</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id}>
                <td>{user.fullName}</td>
                <td>{user.email}</td>
                <td>{user.phoneNo}</td>
                <td>{user.userType}</td>
                <td>{user.serviceType}</td>
                <td>{user.isActive ? "Yes" : "No"}</td>
                <td>{user.createdAt}</td>
                <td>{user.updatedAt}</td>
                <td>
                  <button onClick={() => handleModify(user._id)}>
                    Modify
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModifyModalOpen && selectedUser && (
        <div className="modal">
          <div className="modal-content">
          <button className="close-modal-button" onClick={() => setIsModifyModalOpen(false)}>X</button>
            <h2>Modify User</h2>
            <form>
                <div className="form-group">
              <label>Buisness Name:</label>
              <input
                type="text"
                value={selectedUser.fullName}
                onChange={(e) =>
                  setSelectedUser({
                    ...selectedUser,
                    fullName: e.target.value,
                  })
                }
              />
              </div>
                <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                value={selectedUser.email}
                onChange={(e) =>
                  setSelectedUser({
                    ...selectedUser,
                    email: e.target.value,
                  })
                }
              />
                </div>
                <div className="form-group">
              <label>Phone Number:</label>
              <input
                type="text"
                value={selectedUser.phoneNo}
                onChange={(e) =>
                  setSelectedUser({
                    ...selectedUser,
                    phoneNo: e.target.value,
                  })
                }
              />
                </div>
                <div className="form-group">
              <label>User Type:</label>
              <input
                type="text"
                value={selectedUser.userType}
                onChange={(e) =>
                  setSelectedUser({
                    ...selectedUser,
                    userType: e.target.value,
                  })
                }
              />
                </div>
                <div className="form-group">
                <label>Service Type:</label>
                <select
                value={newVendor.serviceType}
                onChange={(e) =>
                  setNewVendor({ ...newVendor, serviceType: e.target.value })
                }
              >
                <option value="">Select Service Type</option>
                <option value="Type1">Type1</option>
                <option value="Type2">Type2</option>
                <option value="Type3">Type3</option>
              </select>
              <label>Contact Person Name:</label>
              <input
                type="text"
                value={newVendor.contactPersonName}
                onChange={(e) =>
                  setNewVendor({
                    ...newVendor,
                    contactPersonName: e.target.value,
                  })
                }
              />
                </div>
                
                <div className="form-group">
                    <label>Contact Person Name</label>
                    <input
                        type="text"
                        value={selectedUser.contactPersonName}
                        onChange={(e) =>
                            setSelectedUser({
                                ...selectedUser,
                                contactPersonName: e.target.value,
                            })
                        }
                    />
                </div>
                <div className="form-group">
                    <label>Contact Person Email</label>
                    <input
                        type="email"
                        value={selectedUser.contactPersonEmail}
                        onChange={(e) =>
                            setSelectedUser({
                                ...selectedUser,
                                contactPersonEmail: e.target.value,
                            })
                        }
                    />
                </div>

                <div className="form-group">
                    <label>Contact Person Phone No</label>
                    <input
                        type="text"
                        value={selectedUser.contactPersonPhoneNo}
                        onChange={(e) =>
                            setSelectedUser({
                                ...selectedUser,
                                contactPersonPhoneNo: e.target.value,
                            })
                        }
                    />
                </div>
                <div className="form-group">
                    <label>Contact Person Designation</label>
                    <input
                        type="text"
                        value={selectedUser.contactPersonDesignation}
                        onChange={(e) =>
                            setSelectedUser({
                                ...selectedUser,
                                contactPersonDesignation: e.target.value,
                            })
                        }
                    />
                </div>
              <button type="button" onClick={handleUpdateUser}>
                Update
              </button>
              <button onClick={() => setIsModifyModalOpen(false)}>Close</button>
            </form>
            
          </div>
        </div>
      )}

      {isCreateModalOpen && (
        <div className="modal">
            
          <div className="modal-content">
          <button className="close-modal-button" onClick={() => setIsModifyModalOpen(false)}>X</button>
            <h2>Create Vendor</h2>
            <form>
                <div className="form-group">
              <label>Business Name:</label>
              <input
                type="text"
                value={newVendor.businessName}
                onChange={(e) =>
                  setNewVendor({ ...newVendor, businessName: e.target.value })
                }
              />
                </div>
                <div className="form-group">
              <label>Business Display Name:</label>
              <input
                type="text"
                value={newVendor.businessDisplayName}
                onChange={(e) =>
                  setNewVendor({
                    ...newVendor,
                    businessDisplayName: e.target.value,
                  })
                }
              />
                </div>
                <div className="form-group">
              <label>Business Email:</label>
              <input
                type="email"
                value={newVendor.businessEmail}
                onChange={(e) =>
                  setNewVendor({ ...newVendor, businessEmail: e.target.value })
                }
              />
                </div>
                <div className="form-group">
              <label>Business Contact No:</label>
              <input
                type="text"
                value={newVendor.businessContactNo}
                onChange={(e) =>
                  setNewVendor({
                    ...newVendor,
                    businessContactNo: e.target.value,
                  })
                }
              />
                </div>
                <div className="form-group">
              <label>Business Website:</label>
              <input
                type="text"
                value={newVendor.businessWebsite}
                onChange={(e) =>
                  setNewVendor({
                    ...newVendor,
                    businessWebsite: e.target.value,
                  })
                }
              />
                </div>
                <div className="form-group">
              <label>Business Address:</label>
              <input
                type="text"
                value={newVendor.businessAddress}
                onChange={(e) =>
                  setNewVendor({
                    ...newVendor,
                    businessAddress: e.target.value,
                  })
                }
              />
                </div>
                <div className="form-group">
              <label>Business Logo:</label>
              <input type="file" onChange={handleImageUpload} />
              {newVendor.businessLogo && (
                <img
                  src={newVendor.businessLogo}
                  alt="Business Logo"
                  style={{ width: "100px", height: "100px" }}
                />
              )}
                </div>
                <div className="form-group">
              <label>Service Type:</label>
              <select
                value={newVendor.serviceType}
                onChange={(e) =>
                  setNewVendor({ ...newVendor, serviceType: e.target.value })
                }
              >
                <option value="">Select Service Type</option>
                <option value="Type1">Type1</option>
                <option value="Type2">Type2</option>
                <option value="Type3">Type3</option>
              </select>
              <label>Contact Person Name:</label>
              <input
                type="text"
                value={newVendor.contactPersonName}
                onChange={(e) =>
                  setNewVendor({
                    ...newVendor,
                    contactPersonName: e.target.value,
                  })
                }
              />
                </div>
                <div className="form-group">
              <label>Contact Person Email:</label>
              <input
                type="email"
                value={newVendor.contactPersonEmail}
                onChange={(e) =>
                  setNewVendor({
                    ...newVendor,
                    contactPersonEmail: e.target.value,
                  })
                }
              />
                </div>
                <div className="form-group">
              <label>Contact Person Phone No:</label>
              <input
                type="text"
                value={newVendor.contactPersonPhoneNo}
                onChange={(e) =>
                  setNewVendor({
                    ...newVendor,
                    contactPersonPhoneNo: e.target.value,
                  })
                }
              />
                </div>
                <div className="form-group">
              <label>Contact Person Designation:</label>
              <input
                type="text"
                value={newVendor.contactPersonDesignation}
                onChange={(e) =>
                  setNewVendor({
                    ...newVendor,
                    contactPersonDesignation: e.target.value,
                  })
                }
              />
                </div>
                <div className="form-group">
              <label>Is Contact Person Decision Maker:</label>
              <select
                value={newVendor.isContactPersonDecisionMaker.toString()}
                onChange={(e) =>
                  setNewVendor({
                    ...newVendor,
                    isContactPersonDecisionMaker: e.target.value === "true",
                  })
                }
              >
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>
                </div>
              <button type="button" onClick={handleCreateUser}>
                Create Vendor
              </button>
              <button onClick={() => setIsCreateModalOpen(false)}>Close</button>
            </form>
            
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewVendor;
