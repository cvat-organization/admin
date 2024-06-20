// // import React, { useState } from "react";
// // import "./view_user.css"; // Import CSS file for component-specific styles
// // import { useNavigate } from "react-router-dom";

// // interface User {
// //   id: number;
// //   name: string;
// //   registrationDate: string; // New property for date of registration
// // }

// // const ViewUser: React.FC = () => {
// //   const navigate = useNavigate();
// //   const [searchQuery, setSearchQuery] = useState<string>("");

// //   // Example user data with registration dates
// //   const users: User[] = [
// //     { id: 1, name: "User A", registrationDate: "2023-05-15" },
// //     { id: 2, name: "User B", registrationDate: "2023-06-10" },
// //     { id: 3, name: "User C", registrationDate: "2023-04-20" },
// //     { id: 4, name: "User D", registrationDate: "2023-03-05" },
// //     { id: 5, name: "User E", registrationDate: "2023-02-15" },
// //     { id: 6, name: "User F", registrationDate: "2023-01-10" },
// //     { id: 7, name: "User G", registrationDate: "2023-07-20" },
// //     { id: 8, name: "User H", registrationDate: "2023-08-05" },
// //     { id: 9, name: "User I", registrationDate: "2023-09-15" },
// //     { id: 10, name: "User J", registrationDate: "2023-10-10" },
// //   ];

// //   const handleModify = (userId: number) => {
// //     // Handle modify action, e.g., navigate to modify page or show modal
// //     console.log(`Modify user with ID ${userId}`);
// //     // navigate to /user/modify
// //     navigate("/user/update");
// //   };

// //   const filteredUsers = users.filter(
// //     (user) =>
// //       user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
// //       user.id.toString().includes(searchQuery) ||
// //       user.registrationDate.includes(searchQuery)
// //   );

// //   return (
// //     <div className="simple-component-container">
// //       <h2 className="component-title">User List</h2>
// //       <div className="search-container">
// //         <input
// //           type="text"
// //           placeholder="Search users..."
// //           value={searchQuery}
// //           onChange={(e) => setSearchQuery(e.target.value)}
// //           className="search-input"
// //         />
// //       </div>
// //       <div className="table-container">
// //         <table className="user-table">
// //           <thead>
// //             <tr>
// //               <th>USER_ID</th>
// //               <th>USER_NAME</th>
// //               <th>DATE_OF_REGISTRATION</th> {/* New column header */}
// //               <th>Actions</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {filteredUsers.map((user) => (
// //               <tr key={user.id}>
// //                 <td>{user.id}</td>
// //                 <td>{user.name}</td>
// //                 <td>{user.registrationDate}</td>{" "}
// //                 {/* Display registration date */}
// //                 <td>
// //                   <button onClick={() => handleModify(user.id)}>View</button>
// //                 </td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </div>
// //     </div>
// //   );
// // };

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./view_user.css"; // Import CSS file for component-specific styles
// import { useNavigate } from "react-router-dom";

// interface User {
//   trackerID: string;
//   fullName: string;
//   registrationDate: string;
// }

// const ViewUser: React.FC = () => {
//   const navigate = useNavigate();
//   const [searchQuery, setSearchQuery] = useState<string>("");
//   const [users, setUsers] = useState<User[]>([]);
//   const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
//   const [newUser, setNewUser] = useState({
//     fullName: "",
//     displayName: "",
//     phoneNo: "",
//     email: "",
//     password: "",
//   });

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:4000/admin/users/read",
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("jwt")}`, // Get JWT token from local storage
//             },
//           }
//         );

//         if (response.status === 200) {
//           const userData = response.data.map((user: any) => ({
//             trackerID: user.trackerID,
//             fullName: user.fullName,
//             registrationDate: new Date().toISOString().split("T")[0], // Since registrationDate is not provided, we use current date as placeholder
//           }));

//           setUsers(userData);
//           // console.log(response);
//         } else {
//           console.error("Error fetching user data:", response.statusText);
//         }
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       }
//     };

//     fetchUsers();
//   }, []);

//   const handleModify = (userId: string) => {
//     console.log(`Modify user with ID ${userId}`);
//     navigate(`/user/update/${userId}`);
//   };

//   const handleCreateUser = async () => {
//     try {
//       const response = await axios.post(
//         "http://localhost:4000/auth/register",
//         { ...newUser, userType: "Customer" },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("jwt")}`, // Get JWT token from local storage
//           },
//         }
//       );

//       if (response.status === 201) {
//         alert("User registered successfully");
//         setIsModalOpen(false);
//         setNewUser({
//           fullName: "",
//           displayName: "",
//           phoneNo: "",
//           email: "",
//           password: "",
//         });
//         // Optionally, refresh the user list
//       } else {
//         console.error("Error creating user:", response.data.message);
//       }
//     } catch (error) {
//       console.error("Error creating user:", error);
//     }
//   };

//   const filteredUsers = users.filter(
//     (user) =>
//       user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       user.trackerID.toString().includes(searchQuery)
//   );

//   return (
//     <div className="simple-component-container">
//       <div className="header-container">
//         <h2 className="component-title">User List</h2>
//         <button
//           className="create-user-button"
//           onClick={() => setIsModalOpen(true)}
//         >
//           Create User
//         </button>
//       </div>
//       <div className="search-container">
//         <input
//           type="text"
//           placeholder="Search users..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="search-input"
//         />
//       </div>
//       <div className="table-container">
//         <table className="user-table">
//           <thead>
//             <tr>
//               <th>USER_ID</th>
//               <th>USER_NAME</th>
//               <th>DATE_OF_REGISTRATION</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredUsers.map((user) => (
//               <tr key={user.trackerID}>
//                 <td>{user.trackerID}</td>
//                 <td>{user.fullName}</td>
//                 <td>{user.registrationDate}</td>
//                 <td>
//                   <button onClick={() => handleModify(user.trackerID)}>
//                     View
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {isModalOpen && (
//         <div className="modal">
//           <div className="modal-content">
//             <span
//               className="close-button"
//               onClick={() => setIsModalOpen(false)}
//             >
//               &times;
//             </span>
//             <h2>Create New User</h2>
//             <form
//               onSubmit={(e) => {
//                 e.preventDefault();
//                 handleCreateUser();
//               }}
//             >
//               <div className="form-group">
//                 <label>Full Name:</label>
//                 <input
//                   type="text"
//                   value={newUser.fullName}
//                   onChange={(e) =>
//                     setNewUser({ ...newUser, fullName: e.target.value })
//                   }
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Display Name:</label>
//                 <input
//                   type="text"
//                   value={newUser.displayName}
//                   onChange={(e) =>
//                     setNewUser({ ...newUser, displayName: e.target.value })
//                   }
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Phone Number:</label>
//                 <input
//                   type="text"
//                   value={newUser.phoneNo}
//                   onChange={(e) =>
//                     setNewUser({ ...newUser, phoneNo: e.target.value })
//                   }
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Email:</label>
//                 <input
//                   type="text"
//                   value={newUser.email}
//                   onChange={(e) =>
//                     setNewUser({ ...newUser, email: e.target.value })
//                   }
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Password:</label>
//                 <input
//                   type="password"
//                   value={newUser.password}
//                   onChange={(e) =>
//                     setNewUser({ ...newUser, password: e.target.value })
//                   }
//                   required
//                 />
//               </div>
//               <button type="submit" className="create-button">
//                 Create
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ViewUser;

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./view_user.css"; // Import CSS file for component-specific styles
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
  stepLengthCM?: number;
  website?: string;
  createdAt: string;
  updatedAt: string;
}

const ViewUser: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [newUser, setNewUser] = useState({
    fullName: "",
    displayName: "",
    phoneNo: "",
    email: "",
    password: "",
  });

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

        // Log the response to inspect the structure
        console.log("Response data:", response.data);

        if (response.status === 200) {
          if (Array.isArray(response.data.usersData)) {
            const userData = response.data.usersData.map((user: any) => ({
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
              stepLengthCM: user.stepLengthCM,
              website: user.website,
              createdAt: new Date(user.createdAt).toISOString().split("T")[0],
              updatedAt: new Date(user.updatedAt).toISOString().split("T")[0],
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
    console.log(`Modify user with ID ${userId}`);
    // Placeholder for modify functionality
  };

  const handleCreateUser = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/auth/register",
        { ...newUser, userType: "Customer" },
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
        });
        // Optionally, refresh the user list
      } else {
        console.error("Error creating user:", response.data.message);
      }
    } catch (error) {
      console.error("Error creating user:", error);
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
              <th>USER ID</th>
              <th>FULL NAME</th>
              <th>EMAIL</th>
              <th>USER TYPE</th>
              <th>IS ACTIVE</th>
              <th>IS LOGGED IN</th>
              <th>CREATED AT</th>
              <th>UPDATED AT</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.fullName}</td>
                <td>{user.email}</td>
                <td>{user.userType}</td>
                <td>{user.isActive ? "Yes" : "No"}</td>
                <td>{user.isLoggedIn ? "Yes" : "No"}</td>
                <td>{user.createdAt}</td>
                <td>{user.updatedAt}</td>
                <td>
                  <button onClick={() => handleModify(user._id)}>Modify</button>
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
            <h2>Create New User</h2>
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
    </div>
  );
};

export default ViewUser;
