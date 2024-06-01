import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./menu.scss";
import { menu } from "../../data";
import Navbar from "../navbar/Navbar";

const Menu: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = (id: number) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  return (
    <div style={{ height: "100%" }}>
      <Navbar toggleMenu={toggleMenu} />
      {isMenuOpen && <div className="backdrop" onClick={toggleMenu}></div>}
      <div className={`menu ${isMenuOpen ? "open" : ""}`}>
        {menu.map((item) => (
          <div className="item" key={item.id}>
            <span className="title">{item.title}</span>
            {item.listItems.map((listItem) => (
              <div key={listItem.id} className="listItemContainer">
                <Link
                  to={listItem.subItems ? "#" : listItem.url}
                  className="listItem"
                  onClick={() => listItem.subItems && toggleDropdown(listItem.id)}
                >
                  <span className="listItemTitle">{listItem.title}</span>
                  {listItem.subItems && <span className="dropdownArrow">▼</span>}
                </Link>
                {listItem.subItems && (
                  <div className={`dropdown ${activeDropdown === listItem.id ? "open" : ""}`}>
                    {listItem.subItems.map((subItem) => (
                      <Link to={subItem.url} className="subListItem" key={subItem.id}>
                        {subItem.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
