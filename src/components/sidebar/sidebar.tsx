import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./sidebar.css"; // Import the CSS file
import { menu } from "../../data"; // Import menu directly from data.ts

const Sidebar: React.FC<{ expanded: boolean }> = ({ expanded }) => {
  const location = useLocation();

  return (
    <div className={`sidebar ${expanded ? 'expanded' : 'contracted'}`}>
      {/* Render menu items */}
      {menu.map((item) => (
        <div className="menu-item" key={item.id}>
          {/* Render list items */}
          <div className="list-items">
            {item.listItems.map((listItem) => (
              <Link to={listItem.url} className="list-item" key={listItem.id}>
                <div className={`item-box ${location.pathname === listItem.url ? 'active' : ''}`}>
                  <div className={`item-content ${expanded ? 'expanded' : 'contracted'}`}>
                    <div className="item-icon">
                      <img src={listItem.icon} alt="" />
                    </div>
                    <div className="item-name">{listItem.title}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
