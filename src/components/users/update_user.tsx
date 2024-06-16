// this is the veiw user page, just temporarily modified it to show it

import React, { useState } from "react";
import "./update_user.css";

const UpdateUser: React.FC = () => {
  const [userId, setUserId] = useState<number>(1); // Example userId
  const [userName, setUserName] = useState<string>("User A"); // Example userName
  const [contactEmail, setContactEmail] = useState<string>("user@example.com"); // Example contact email
  const [roles, setRoles] = useState<string[]>(["Role A", "Role B"]); // Example roles

  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const handleContactEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContactEmail(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Replace with actual update logic (e.g., API call)
    console.log("Updating user:", {
      userId,
      userName,
      contactEmail,
      roles,
    });
    // Example API call:
    // fetch('/api/updateUser', {
    //   method: 'PUT',
    //   body: JSON.stringify({ userId, userName, contactEmail, roles }),
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // }).then(response => response.json())
    //   .then(data => {
    //     console.log('Update successful:', data);
    //     // Handle success state or navigation
    //   })
    //   .catch(error => {
    //     console.error('Update failed:', error);
    //     // Handle error state
    //   });
  };

  return (
    <div className="user-update-container">
      <div className="user-form">
        <h2>View User Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="userId">User ID</label>
            <input type="text" id="userId" value={userId} readOnly />
          </div>
          <div className="form-group">
            <label htmlFor="userName">User Name</label>
            <input
              type="text"
              id="userName"
              value={userName}
              onChange={handleUserNameChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="contactEmail">Contact Email</label>
            <input
              type="email"
              id="contactEmail"
              value={contactEmail}
              onChange={handleContactEmailChange}
              required
            />
          </div>
          {/* <button type="submit">Update User</butto n> */}
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;
