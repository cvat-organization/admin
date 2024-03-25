// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import "./menu.scss";
// import { menu } from "../../data";
// // Import the toggle menu icon

// const Menu = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   return (
//     <div className={`menu ${isMenuOpen ? "open" : ""}`}>
//       {/* Toggle button above the menu */}
//       <button className="toggle-button" onClick={toggleMenu}>
//         <img src="toggle-menu.svg" alt="Toggle Menu" />
//       </button>
//       {menu.map((item) => (
//         <div className="item" key={item.id}>
//           <span className="title">{item.title}</span>
//           {isMenuOpen &&
//             item.listItems.map((listItem) => (
//               <Link to={listItem.url} className="listItem" key={listItem.id}>
//                 <img src={listItem.icon} alt="" />
//                 <span className="listItemTitle">{listItem.title}</span>
//               </Link>
//             ))}
//           {!isMenuOpen &&
//             item.listItems.map((listItem) => (
//               <Link to={listItem.url} className="listItem" key={listItem.id}>
//                 <img src={listItem.icon} alt="" />
//               </Link>
//             ))}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Menu;

// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import "./menu.scss";
// import { menu } from "../../data";
// import Navbar from "../navbar/Navbar";

// const Menu: React.FC = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   const menuClass = isMenuOpen ? "menu open" : "menu";
//   const contentClass = isMenuOpen ? "content open" : "content";

//   return (
//     <div>
//       <header>
//         <button onClick={toggleMenu} className="sidebar-toggle">
//           Toggle Menu
//         </button>
//       </header>
//       <div className={menuClass}>
//         {menu.map((item) => (
//           <div className="item" key={item.id}>
//             <span className="title">{item.title}</span>
//             {item.listItems.map((listItem) => (
//               <Link to={listItem.url} className="listItem" key={listItem.id}>
//                 <img src={listItem.icon} alt="" />
//                 <span className="listItemTitle">{listItem.title}</span>
//               </Link>
//             ))}
//           </div>
//         ))}
//       </div>
//       <div className={contentClass}>{/* Your main content here */}</div>
//     </div>
//   );
// };

// export default Menu;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./menu.scss";
import { menu } from "../../data";
import Navbar from "../navbar/Navbar";

const Menu: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuClass = isMenuOpen ? "menu open" : "menu";
  const contentClass = isMenuOpen ? "content open" : "content";
  const backdropClass = isMenuOpen ? "backdrop open" : "backdrop";

  return (
    <div>
      <Navbar toggleMenu={toggleMenu} />
      <div className={backdropClass} onClick={toggleMenu}></div>{" "}
      {/* Backdrop */}
      <div className={menuClass}>
        {/* <button onClick={toggleMenu} className="sidebar-toggle">
          D
        </button> */}
        {menu.map((item) => (
          <div className="item" key={item.id}>
            <span className="title">{item.title}</span>
            {item.listItems.map((listItem) => (
              <Link to={listItem.url} className="listItem" key={listItem.id}>
                <img src={listItem.icon} alt="" />
                <span className="listItemTitle">{listItem.title}</span>
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
