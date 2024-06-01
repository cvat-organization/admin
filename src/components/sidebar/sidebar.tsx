import React from "react";
import { Link } from "react-router-dom";
import "./sidebar.css"; // Import the CSS file
import { menu } from "../../data"; // Assuming you have data for the menu items

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      {/* Render menu items */}
      {menu.map((item) => (
        <div className="menu-item" key={item.id}>
          {/* Render list items */}
          <div className="list-items">
            {item.listItems.map((listItem) => (
              <Link to={listItem.url} className="list-item" key={listItem.id}>
                <img src={listItem.icon} alt="" />
                {/* <span className="list-item-title">{listItem.title}</span> */}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
