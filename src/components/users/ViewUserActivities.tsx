// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./view_user_activities.css";

// interface User {
//   id: number;
//   name: string;
//   registrationDate: string; // New property for date of registration
// }

// interface Activity {
//   name: string;
//   date: string;
//   duration: string; // Example property to hold activity duration
// }

// const ViewUserActivities: React.FC = () => {
//   const navigate = useNavigate();
//   const [selectedUser, setSelectedUser] = useState<User | null>(null);
//   const [activities, setActivities] = useState<Activity[]>([]);

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

//   const userActivities: { [key: number]: Activity[] } = {
//     1: [
//       { name: "Running", date: "2023-06-01", duration: "30 mins" },
//       { name: "Bench Press", date: "2023-06-02", duration: "45 mins" },
//     ],
//     2: [
//       { name: "Swimming", date: "2023-06-03", duration: "1 hour" },
//       { name: "Cycling", date: "2023-06-04", duration: "2 hours" },
//     ],
//     // Add activities for other users...
//   };

//   const handleViewActivities = (user: User) => {
//     setSelectedUser(user);
//     setActivities(userActivities[user.id] || []);
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
//               <th>DATE_OF_REGISTRATION</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((user) => (
//               <tr key={user.id}>
//                 <td>{user.id}</td>
//                 <td>{user.name}</td>
//                 <td>{user.registrationDate}</td>
//                 <td>
//                   <button onClick={() => handleViewActivities(user)}>
//                     View Activities
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       {selectedUser && (
//         <div className="activities-container">
//           <h3>Activities for {selectedUser.name}</h3>
//           <UserActivitiesTable activities={activities} />
//         </div>
//       )}
//     </div>
//   );
// };

// interface UserActivitiesTableProps {
//   activities: Activity[];
// }

// const UserActivitiesTable: React.FC<UserActivitiesTableProps> = ({
//   activities,
// }) => {
//   return (
//     <div className="table-container">
//       <table className="activity-table">
//         <thead>
//           <tr>
//             <th>ACTIVITY_NAME</th>
//             <th>DATE</th>
//             <th>DURATION</th>
//           </tr>
//         </thead>
//         <tbody>
//           {activities.map((activity, index) => (
//             <tr key={index}>
//               <td>{activity.name}</td>
//               <td>{activity.date}</td>
//               <td>{activity.duration}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ViewUserActivities;

import React from "react";
import { useNavigate } from "react-router-dom";
import "./view_user_activities.css";

interface User {
  id: number;
  name: string;
}

const ViewUserActivities: React.FC = () => {
  const navigate = useNavigate();

  const users: User[] = [
    { id: 1, name: "User A" },
    { id: 2, name: "User B" },
    { id: 3, name: "User C" },
    { id: 4, name: "User D" },
    { id: 5, name: "User E" },
    { id: 6, name: "User F" },
    { id: 7, name: "User G" },
    { id: 8, name: "User H" },
    { id: 9, name: "User I" },
    { id: 10, name: "User J" },
  ];

  const handleViewActivities = (userId: number) => {
    navigate(`/user/${userId}/activities`);
  };

  return (
    <div className="simple-component-container">
      <h2 className="component-title">User List</h2>
      <div className="table-container">
        <table className="user-table">
          <thead>
            <tr>
              <th>USER_ID</th>
              <th>USER_NAME</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>
                  <button onClick={() => handleViewActivities(user.id)}>
                    View Activities
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

export default ViewUserActivities;
