// import "./navbar.scss";

// const Navbar = () => {
//   return (
//     <div className="navbar">
//       <div className="logo">
//         <img src="logo.svg" alt="" />
//         <span>a c t i v o</span>
//       </div>
//       <div className="icons">
//         <div className="user">
//           <span>Sathish</span>
//           <img src="profile-2.svg" alt="" className="icon" />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;

// import React, { useState } from "react";
// import "./navbar.scss";
// import DropDown from "../dropdown/dropdown";

// const Navbar: React.FC = () => {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };

//   return (
//     <div className="navbar">
//       <div className="logo">
//         <img src="logo.svg" alt="" />
//         <span>CareVigil</span>
//       </div>
//       <div className="icons">
//         <div className="user">
//           <span>Sathish</span>
//           <img
//             src="profile-2.svg"
//             alt=""
//             className="icon"
//             onClick={toggleDropdown}
//           />
//           <DropDown showDropDown={isDropdownOpen} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;

import React from "react";
import "./navbar.scss";

interface NavbarProps {
  toggleMenu: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleMenu }) => {
  return (
    <div className="navbar">
      <button onClick={toggleMenu} className="menu-toggle">
        <img src="/toggle-menu.svg" alt="Toggle Menu" />
      </button>
      <div className="logo">
        <img src="logo.svg" alt="" />
        <span>a c t i v o</span>
      </div>
      <div className="icons">
        <div className="user">
          <span>Sathish</span>
          <img src="profile-2.svg" alt="" className="icon" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
