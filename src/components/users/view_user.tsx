import React, { useState, useEffect } from "react";
import axios from "axios";
import "./view_user.css"; // Import CSS file for component-specific styles
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx"; // Import xlsx library for Excel operations
import jsPDF from "jspdf";
import "jspdf-autotable";

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
  stepLengthCM?: number;
  website?: string;
  createdAt: string;
  updatedAt: string;
}

interface Activity {
  ///
  activityName: string;
  subActivity?: string;
  startTime: string;
  endTime: string;
  parameters: {
    [key: string]: any;
  };
  comments?: string;
}

const ViewUser: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isModifyModalOpen, setIsModifyModalOpen] = useState<boolean>(false);
  const [newUser, setNewUser] = useState({
    fullName: "",
    displayName: "",
    phoneNo: "",
    email: "",
    password: "",
    userType: "",
  });
  const [selectedUser, setSelectedUser] = useState<Partial<User> | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]); ///
  const [activityMessage, setActivityMessage] = useState<string>("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/admin/users/read",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt")}`, // Get JWT token from local storage
            },
          }
        );

        if (response.status === 200) {
          if (Array.isArray(response.data.usersData)) {
            const userData = response.data.usersData.map((user: any) => ({
              _id: user._id,
              fullName: user.fullName,
              email: user.email,
              userType: user.userType,
              isActive: user.isActive,
              createdAt: new Date(user.createdAt).toISOString().split("T")[0],
              updatedAt: new Date(user.updatedAt).toISOString().split("T")[0],
              phoneNo: user.phoneNo,
              location: user.location,
              bio: user.bio,
              birthYear: user.birthYear,
              height: user.height,
              weight: user.weight,
              website: user.website,
            }));

            setUsers(userData);
          } else {
            console.error("Error: response.data.usersData is not an array");
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
            Authorization: `Bearer ${localStorage.getItem("jwt")}`, // Get JWT token from local storage
          },
        }
      );

      if (response.status === 200) {
        alert("User updated successfully");
        setIsModifyModalOpen(false);
        setSelectedUser(null);
        // Optionally, refresh the user list
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
        "http://localhost:4000/admin/users/write", // Updated endpoint
        { ...newUser },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`, // Get JWT token from local storage
          },
        }
      );

      if (response.status === 201) {
        alert("User registered successfully");
        setIsModalOpen(false);
        setNewUser({
          fullName: "",
          displayName: "",
          phoneNo: "",
          email: "",
          password: "",
          userType: "", // Reset userType after successful creation
        });
        // Optionally, refresh the user list
      } else {
        console.error("Error creating user:", response.data.message);
      }
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const handleExportToExcel = () => {
    // Convert users data to Excel format
    const ws = XLSX.utils.json_to_sheet(users);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Users");

    // Save Excel file
    XLSX.writeFile(wb, "users.xlsx");

    // Optionally, you can add feedback to the user
    console.log("Users exported to Excel");
  };

  const handleExportToPDF = () => {
    // Initialize PDF document
    const doc = new jsPDF();

    // Define columns for PDF table
    const columns = [
      "Full Name",
      "Email",
      "User Type",
      "Is Active",
      "Created At",
      "Updated At",
    ];

    // Map users data to rows array
    const rows = users.map((user) => [
      user._id,
      user.fullName,
      user.email,
      user.userType,
      user.isActive ? "Yes" : "No",
      user.createdAt,
      user.updatedAt,
    ]);

    // Add table to PDF document using autoTable plugin
    (doc as any).autoTable({ head: [columns], body: rows });

    // Save PDF file
    doc.save("users.pdf");

    // Optionally, you can add feedback to the user
    console.log("Users exported to PDF");
  };

  const fetchUserActivities = async (userId: string) => {
    // console.log(userId);
    try {
      const response = await axios.get(
        `http://localhost:4000/admin/users/get-activities-history/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );

      if (response.status === 200) {
        setActivities(
          response.data.trackableActivitiesHistory.concat(
            response.data.untrackableActivitiesHistory
          )
        );
        // setActivityMessage(response.data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        setActivityMessage(error.response.data.message);
      } else {
        console.error("Error fetching user activities:", error);
      }
    }
  };

  const handleDeleteUser = async () => {
    if (!selectedUser?._id) {
      console.error("No user selected for deletion");
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmed) return;

    try {
      const response = await axios.delete(
        "http://localhost:4000/admin/users/delete",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`, // Get JWT token from local storage
          },
          data: {
            _id: selectedUser._id,
          },
        }
      );

      if (response.status === 200) {
        alert("User deleted successfully");
        setIsModifyModalOpen(false);
        setSelectedUser(null);
        setUsers(users.filter((user) => user._id !== selectedUser._id)); // Remove the deleted user from the state
      } else {
        console.error("Error deleting user:", response.data.message);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user._id.includes(searchQuery)
  );

  return (
    <div className="simple-component-container">
      <div className="header-container">
        <h2 className="component-title">User List</h2>
        <button
          className="create-user-button"
          onClick={() => setIsModalOpen(true)}
        >
          Create User
        </button>
      </div>
      <button className="export-excel-button" onClick={handleExportToExcel}>
        Export to Excel
      </button>
      <button className="export-pdf-button" onClick={handleExportToPDF}>
        Export to PDF
      </button>
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
        <div className="table-scroll">
          <table className="user-table">
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Email</th>
                <th>User Type</th>
                <th>Is Active</th>
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
                  <td>{user.userType}</td>
                  <td>{user.isActive ? "Yes" : "No"}</td>
                  <td>{user.createdAt}</td>
                  <td>{user.updatedAt}</td>
                  <td>
                    <button
                      className="modify-button"
                      onClick={() => handleModify(user._id)}
                    >
                      <img src={`/view.svg`} alt="Modify" />
                    </button>
                    {/* </td>
                <td> */}
                    <button
                      className="activity-button"
                      onClick={() => fetchUserActivities(user._id)}
                    >
                      <img src="/activity.svg" alt="Activities" />
                    </button>
                    <button
                      className="challenges-button"
                      // placeholder button for challenges
                    >
                      <img src="/challenge-icon.svg" alt="Activities" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
            <h2>Create New User</h2>
            <button className="close-modal-button" onClick={() => setIsModalOpen(false)}>X</button>
          </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleCreateUser();
              }}
            >
              <div className="form-group">
                <label>Full Name:</label>
                <input
                  type="text"
                  value={newUser.fullName}
                  onChange={(e) =>
                    setNewUser({ ...newUser, fullName: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label>User Type:</label>
                <select
                  value={newUser.userType}
                  onChange={(e) =>
                    setNewUser({ ...newUser, userType: e.target.value })
                  }
                  required
                >
                  <option value="">Select user type</option>
                  <option value="Customer">Customer</option>
                  <option value="Vendor">Vendor</option>
                  <option value="Superuser">Superuser</option>
                </select>
              </div>
              <div className="form-group">
                <label>Display Name:</label>
                <input
                  type="text"
                  value={newUser.displayName}
                  onChange={(e) =>
                    setNewUser({ ...newUser, displayName: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label>Phone Number:</label>
                <input
                  type="text"
                  value={newUser.phoneNo}
                  onChange={(e) =>
                    setNewUser({ ...newUser, phoneNo: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="text"
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser({ ...newUser, email: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label>Password:</label>
                <input
                  type="password"
                  value={newUser.password}
                  onChange={(e) =>
                    setNewUser({ ...newUser, password: e.target.value })
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

      {isModifyModalOpen && selectedUser && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
                        <h2>Modify User</h2>
                        <button className="close-modal-button" onClick={() => setIsModifyModalOpen(false)}>X</button>
          </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdateUser();
              }}
            >
              <div className="form-group">
                <label>Full Name:</label>
                <input
                  type="text"
                  value={selectedUser.fullName || ""}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      fullName: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="text"
                  value={selectedUser.email || ""}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, email: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label>User Type:</label>
                <select
                  value={selectedUser.userType || ""}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      userType: e.target.value,
                    })
                  }
                  required
                >
                  <option value="">Select user type</option>
                  <option value="Customer">Customer</option>
                  <option value="Vendor">Vendor</option>
                  <option value="Superuser">Superuser</option>
                </select>
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="text"
                  value={selectedUser.phoneNo || ""}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, email: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  value={selectedUser.location || ""}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      location: e.target.value,
                    })
                  }
                />
              </div>

              <div className="form-group">
                <label>Birth Year</label>
                <input
                  type="number"
                  value={selectedUser.birthYear || ""}
                  onChange={(e) => {
                    const value = parseInt(e.target.value, 10);
                    setSelectedUser({
                      ...selectedUser,
                      birthYear: isNaN(value) ? undefined : value,
                    });
                  }}
                  min="1900" // Optional: Set a reasonable minimum value
                  max={new Date().getFullYear()} // Optional: Set the current year as the maximum value
                />
              </div>

              <div className="form-group">
                <label>Height</label>
                <input
                  type="number"
                  value={selectedUser.height || ""}
                  onChange={(e) => {
                    const value = parseInt(e.target.value, 10);
                    setSelectedUser({
                      ...selectedUser,
                      height: isNaN(value) ? undefined : value,
                    });
                  }}
                />
              </div>

              <div className="form-group">
                <label>Weight</label>
                <input
                  type="number"
                  value={selectedUser.weight || ""}
                  onChange={(e) => {
                    const value = parseInt(e.target.value, 10);
                    setSelectedUser({
                      ...selectedUser,
                      weight: isNaN(value) ? undefined : value,
                    });
                  }}
                />
              </div>

              <div className="form-group">
                <label>Bio</label>
                <input
                  type="text"
                  value={selectedUser.bio || ""}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      bio: e.target.value,
                    })
                  }
                />
              </div>

              <div className="form-group">
                <label>Website</label>
                <input
                  type="text"
                  value={selectedUser.website || ""}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      website: e.target.value,
                    })
                  }
                />
              </div>

              <div className="form-group">
                <label>Is Active:</label>
                <input
                  type="checkbox"
                  checked={selectedUser.isActive || false}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      isActive: e.target.checked,
                    })
                  }
                />
              </div>

              {/* Add more fields as necessary */}
              <button type="submit" className="update-button">
                Update
              </button>
              <button

                className="delete-button"
                onClick={() => setIsModifyModalOpen(false)}
              >
                Close
              </button>
            </form>
          </div>
        </div>
      )}
      {activities.length > 0 && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
            <h2>User Activities</h2>
            </div>
            {activities.map((activity, index) => (
              <div key={index} className="activity-card">
                <h3>{activity.activityName}</h3>
                <p>
                  <strong>Start Time:</strong>{" "}
                  {new Date(activity.startTime).toLocaleString()}
                </p>
                <p>
                  <strong>End Time:</strong>{" "}
                  {new Date(activity.endTime).toLocaleString()}
                </p>
                <p>
                  <strong>Comments:</strong> {activity.comments}
                </p>
              </div>
            ))}
            <button onClick={() => setActivities([])}>Close</button>
          </div>
        </div>
      )}

      {activityMessage && (
        <div className="modal">
          <div className="modal-content">
            <p>{activityMessage}</p>
            <button onClick={() => setActivityMessage("")}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewUser;
