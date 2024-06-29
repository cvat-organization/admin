import React, { useState, useEffect } from "react";
import axios from "axios";
import "./view_activities.css"; // Import CSS file for component-specific styles

interface TrackableActivity {
  _id: string;
  activityName: string;
  startTime: string;
  endTime: string;
  parameters: Record<string, any>;
}

interface Activity {
  _id: string;
  userID: string;
  trackableActivitiesHistory: TrackableActivity[];
  untrackableActivitiesHistory?: Array<any>;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const ViewActivities: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/admin/activitieshistory/read",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt")}`, // Get JWT token from local storage
            },
          }
        );

        if (response.status === 200) {
          console.log(response.data.activitiesData);
          setActivities(response.data.activitiesData);
        } else {
          console.error("Error fetching activities data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching activities data:", error);
      }
    };

    fetchActivities();
  }, []);

  const calculateDuration = (startTime: string, endTime: string) => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const duration = Math.abs(end.getTime() - start.getTime()) / 1000;
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes}m ${seconds}s`;
  };

  const filteredActivities = activities.filter(
    (activity) =>
      activity.userID.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity._id.includes(searchQuery)
  );

  return (
    <div className="simple-component-container">
      <div className="header-container">
        <h2 className="component-title">Activity List</h2>
      </div>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search activities..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>
      <div className="table-container">
        <table className="activity-table">
          <thead>
            <tr>
                <th>User ID</th>
              <th>Activity Name</th>
              <th>Duration</th>
              <th>Is Active</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredActivities.map((activity) => (
              <React.Fragment key={activity._id}>
                {activity.trackableActivitiesHistory.map((trackableActivity) => (
                  <tr key={trackableActivity._id}>  
                    <td>{activity.userID}</td>
                    <td>{trackableActivity.activityName}</td>
                    <td>{calculateDuration(trackableActivity.startTime, trackableActivity.endTime)}</td>
                    <td>{activity.isActive ? "Yes" : "No"}</td>
                    <td>{activity.createdAt}</td>
                    <td>{activity.updatedAt}</td>
                    <td>
                      <button onClick={() => setSelectedActivity(activity)}>View</button>
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {selectedActivity && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={() => setSelectedActivity(null)}>
              &times;
            </span>
            <h2>Activity Details</h2>
            <p><strong>Activity ID:</strong> {selectedActivity._id}</p>
            <p><strong>User ID:</strong> {selectedActivity.userID}</p>
            <p><strong>Is Active:</strong> {selectedActivity.isActive ? "Yes" : "No"}</p>
            <p><strong>Created At:</strong> {selectedActivity.createdAt}</p>
            <p><strong>Updated At:</strong> {selectedActivity.updatedAt}</p>
            <h3>Trackable Activities:</h3>
            <ul>
              {selectedActivity.trackableActivitiesHistory.map((trackableActivity) => (
                <li key={trackableActivity._id}>
                  <p><strong>Activity Name:</strong> {trackableActivity.activityName}</p>
                  <p><strong>Start Time:</strong> {trackableActivity.startTime}</p>
                  <p><strong>End Time:</strong> {trackableActivity.endTime}</p>
                  <p><strong>Duration:</strong> {calculateDuration(trackableActivity.startTime, trackableActivity.endTime)}</p>
                  <p><strong>Parameters:</strong> {JSON.stringify(trackableActivity.parameters)}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewActivities;
