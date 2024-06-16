import React from "react";
import { useParams } from "react-router-dom";
import "./user_activities.css";

interface Activity {
  name: string;
  date: string;
  duration: string; // Example property to hold activity duration
}

const UserActivities: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();

  const userActivities: { [key: number]: Activity[] } = {
    1: [
      { name: "Running", date: "2023-06-01", duration: "30 mins" },
      { name: "Bench Press", date: "2023-06-02", duration: "45 mins" },
    ],
    2: [
      { name: "Swimming", date: "2023-06-03", duration: "1 hour" },
      { name: "Cycling", date: "2023-06-04", duration: "2 hours" },
    ],
    // Add activities for other users...
  };

  const activities = userActivities[parseInt(userId || "0")] || [];

  return (
    <div className="activities-container">
      <h2 className="component-title">Activities for User {userId}</h2>
      <div className="table-container">
        <table className="activity-table">
          <thead>
            <tr>
              <th>ACTIVITY_NAME</th>
              <th>DATE</th>
              <th>DURATION</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity, index) => (
              <tr key={index}>
                <td>{activity.name}</td>
                <td>{activity.date}</td>
                <td>{activity.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserActivities;
