import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Profile.css';
const ProfilePage: React.FC = () => {
  const [profileData, setProfileData] = useState<any>(null); // Define the type of profileData as per your response object

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/profile/get-user-profile", {
          headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        });
        if (response.status === 200) {
          setProfileData(response.data); // Set the fetched profile data to state
        } else {
          console.error("Failed to fetch profile data:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData(); // Call the function to fetch profile data when the component mounts
  }, []);

  return (
    <div className="profile-container">
      {profileData && (
        <div>
          <div className="profile-picture">
            {/* <img src={`data:image/jpeg;base64,${profileData.profilePicture}`} alt="" /> */}
            <img src={'D:/CareVigil Internship/Admin-Website/admin/public/tekken icon.ico'} alt="" />
          </div>
          <h2>User Profile</h2>
          <div className="profile-info">
            <label>Full Name:</label>
            <p>{profileData.fullName}</p>
          </div>
          <div className="profile-info">
            <label>Display Name:</label>
            <p>{profileData.displayName}</p>
          </div>
          <div className="profile-info">
            <label>Tracker ID:</label>
            <p>{profileData.trackerID}</p>
          </div>
          <div className="profile-info">
            <label>Email:</label>
            <p>{profileData.email}</p>
          </div>
          <div className="profile-info">
            <label>Phone Number:</label>
            <p>{profileData.phoneNo}</p>
          </div>
          <div className="profile-info">
            <label>Bio:</label>
            <p>{profileData.bio}</p>
          </div>
          <div className="profile-info">
            <label>Website:</label>
            <p>{profileData.website}</p>
          </div>
          <div className="profile-info">
            <label>Location:</label>
            <p>{profileData.location}</p>
          </div>
          <div className="profile-info">
            <label>Gender:</label>
            <p>{profileData.gender}</p>
          </div>
          <div className="profile-info">
            <label>Birth Year:</label>
            <p>{profileData.birthYear}</p>
          </div>
          <div className="profile-info">
            <label>Metric:</label>
            <p>{profileData.metric}</p>
          </div>
          <div className="profile-info">
            <label>Height:</label>
            <p>{profileData.height}</p>
          </div>
          <div className="profile-info">
            <label>Weight:</label>
            <p>{profileData.weight}</p>
          </div>
          <div className="profile-info">
            <label>Step Length (CM):</label>
            <p>{profileData.stepLengthCM}</p>
          </div>
          <div className="profile-info">
            <label>Subscription Status:</label>
            <p>{profileData.subscriptionStatus}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
