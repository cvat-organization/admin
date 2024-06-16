// // import React from "react";
// // import "./view_user.css"; // Import CSS file for component-specific styles
// // import { useNavigate } from "react-router-dom";

// // interface User {
// //   id: number;
// //   name: string;
// //   registrationDate: string; // New property for date of registration
// // }

// // const ViewUser: React.FC = () => {
// //   const navigate = useNavigate();

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

// //   return (
// //     <div className="simple-component-container">
// //       <h2 className="component-title">User List</h2>
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
// //             {users.map((user) => (
// //               <tr key={user.id}>
// //                 <td>{user.id}</td>
// //                 <td>{user.name}</td>
// //                 <td>{user.registrationDate}</td>{" "}
// //                 {/* Display registration date */}
// //                 <td>
// //                   <button onClick={() => handleModify(user.id)}>Modify</button>
// //                 </td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ViewUser;

// import React from "react";
// import "./view_user.css"; // Import CSS file for component-specific styles
// import { useNavigate } from "react-router-dom";

// interface User {
//   id: number;
//   name: string;
//   registrationDate: string; // New property for date of registration
// }

// const ViewUser: React.FC = () => {
//   const navigate = useNavigate();

//   // Example user data with registration dates
//   const users: User[] = [
//     { id: 1, name: "User A", registrationDate: "2023-05-15" },
//     { id: 2, name: "User B", registrationDate: "2023-06-10" },
//     { id: 3, name: "User C", registrationDate: "2023-04-20" },
//     { id: 4, name: "User D", registrationDate: "2023-03-05" },
//     { id: 5, name: "User E", registrationDate: "2023-02-15" },
//     { id: 6, name: "User F", registrationDate: "2023-01-10" },
//     { id: 7, name: "User G", registrationDate: "2023-07-20" },
//     { id: 8, name: "User H", registrationDate: "2023-08-05" },
//     { id: 9, name: "User I", registrationDate: "2023-09-15" },
//     { id: 10, name: "User J", registrationDate: "2023-10-10" },
//   ];

//   const handleModify = (userId: number) => {
//     // Handle modify action, e.g., navigate to modify page or show modal
//     console.log(`Modify user with ID ${userId}`);
//     // navigate to /user/modify
//     navigate("/user/update");
//   };

//   return (
//     <div className="simple-component-container">
//       <h2 className="component-title">User List</h2>
//       <div className="table-container">
//         <table className="user-table">
//           <thead>
//             <tr>
//               <th>USER_ID</th>
//               <th>USER_NAME</th>
//               <th>DATE_OF_REGISTRATION</th> {/* New column header */}
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((user) => (
//               <tr key={user.id}>
//                 <td>{user.id}</td>
//                 <td>{user.name}</td>
//                 <td>{user.registrationDate}</td>{" "}
//                 {/* Display registration date */}
//                 <td>
//                   <button onClick={() => handleModify(user.id)}>Modify</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ViewUser;

import React, { useState } from "react";
import "./view_user.css"; // Import CSS file for component-specific styles
import { useNavigate } from "react-router-dom";

interface User {
  id: number;
  name: string;
  registrationDate: string; // New property for date of registration
}

const ViewUser: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Example user data with registration dates
  const users: User[] = [
    { id: 1, name: "User A", registrationDate: "2023-05-15" },
    { id: 2, name: "User B", registrationDate: "2023-06-10" },
    { id: 3, name: "User C", registrationDate: "2023-04-20" },
    { id: 4, name: "User D", registrationDate: "2023-03-05" },
    { id: 5, name: "User E", registrationDate: "2023-02-15" },
    { id: 6, name: "User F", registrationDate: "2023-01-10" },
    { id: 7, name: "User G", registrationDate: "2023-07-20" },
    { id: 8, name: "User H", registrationDate: "2023-08-05" },
    { id: 9, name: "User I", registrationDate: "2023-09-15" },
    { id: 10, name: "User J", registrationDate: "2023-10-10" },
  ];

  const handleModify = (userId: number) => {
    // Handle modify action, e.g., navigate to modify page or show modal
    console.log(`Modify user with ID ${userId}`);
    // navigate to /user/modify
    navigate("/user/update");
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.id.toString().includes(searchQuery) ||
      user.registrationDate.includes(searchQuery)
  );

  return (
    <div className="simple-component-container">
      <h2 className="component-title">User List</h2>
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
              <th>USER_ID</th>
              <th>USER_NAME</th>
              <th>DATE_OF_REGISTRATION</th> {/* New column header */}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.registrationDate}</td>{" "}
                {/* Display registration date */}
                <td>
                  <button onClick={() => handleModify(user.id)}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewUser;
