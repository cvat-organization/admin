import React, { useState, useEffect } from "react";
import axios from "axios";
import "./activity_table.css";
import * as XLSX from "xlsx"; // Import xlsx library for Excel operations
import jsPDF from "jspdf";
import "jspdf-autotable";

interface TrackableActivity {
  _id: string;
  activityName: string;
  startTime: string;
  endTime: string;
  parameters: Record<string, any>;
}

interface Activity {
  _id: string;
  fullName: string;
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
    const seconds = (duration % 60).toFixed(0);
    return `${minutes}m ${seconds}s`;
  };

  const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime);
    return date.toLocaleString();
  };

  const filteredActivities = activities.filter(
    (activity) =>
      activity.userID.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity._id.includes(searchQuery)
  );

  const handleExportToExcel = () => {
    // Convert users data to Excel format
    const ws = XLSX.utils.json_to_sheet(activities);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Activities");

    // Save Excel file
    XLSX.writeFile(wb, "Activities.xlsx");

    // Optionally, you can add feedback to the user
    console.log("Activities exported to Excel");
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
    const rows = activities.map((activities) => [
      activities._id,
      activities.fullName,
      activities. trackableActivitiesHistory,
      activities.untrackableActivitiesHistory,
      activities.createdAt,
      activities.updatedAt,
    ]);

    // Add table to PDF document using autoTable plugin
    (doc as any).autoTable({ head: [columns], body: rows });

    // Save PDF file
    doc.save("activities.pdf");

    // Optionally, you can add feedback to the user
    console.log("Activities exported to PDF");
  };

  return (
    <div className="simple-component-container">
      <div className="header-container">
        <h2 className="component-title">Activity List</h2>
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
          placeholder="Search activities..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>
      <div className="table-container">
        <div className="table-scroll">
        <table className="activity-table">
          <thead>
            <tr>
              <th>Name</th>
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
                    <td>{activity.fullName}</td>
                    <td>{trackableActivity.activityName}</td>
                    <td>{calculateDuration(trackableActivity.startTime, trackableActivity.endTime)}</td>
                    <td>{activity.isActive ? "Yes" : "No"}</td>
                    <td>{formatDateTime(activity.createdAt)}</td>
                    <td>{formatDateTime(activity.updatedAt)}</td>
                    <td>
                      <button
                        className="view-button"
                        onClick={() => setSelectedActivity(activity)}
                      >
                        <img src={`/view.svg`} alt="Modify" />
                      </button>
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
        </div>
      </div>

      {selectedActivity && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
            <h2>Activity Details</h2>
            <button className="close-modal-button" onClick={() => setSelectedActivity(null)}>X</button>
            </div>
            <p><strong>Activity ID:</strong> {selectedActivity._id}</p>
            <p><strong>Is Active:</strong> {selectedActivity.isActive ? "Yes" : "No"}</p>
            <p><strong>Created At:</strong> {formatDateTime(selectedActivity.createdAt)}</p>
            <p><strong>Updated At:</strong> {formatDateTime(selectedActivity.updatedAt)}</p>
            <h3>Trackable Activities:</h3>
            <ul>
              {selectedActivity.trackableActivitiesHistory.map((trackableActivity) => (
                <li key={trackableActivity._id}>
                  <p><strong>Activity Name:</strong> {trackableActivity.activityName}</p>
                  <p><strong>Start Time:</strong> {formatDateTime(trackableActivity.startTime)}</p>
                  <p><strong>End Time:</strong> {formatDateTime(trackableActivity.endTime)}</p>
                  <p><strong>Duration:</strong> {calculateDuration(trackableActivity.startTime, trackableActivity.endTime)}</p>
                  {/* <p><strong>Parameters:</strong> {JSON.stringify(trackableActivity.parameters)}</p> */}
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
