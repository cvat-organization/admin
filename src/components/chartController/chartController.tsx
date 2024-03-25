// import React, { useState } from "react";
// import UserChart from "../Test";
// import VendorChart from "../vendor_chart";
// import ChallengeBarChart from "../challenge_chart";
// import "./chartController.scss"; // Import the SCSS file

// const ChartController: React.FC<{}> = () => {
//   const [selectedRange, setSelectedRange] = useState<string>("1year");

//   const handleRangeChange = (range: string) => {
//     setSelectedRange(range);
//   };

//   return (
//     <div className="chartdiv">
//       <div className="button-container">
//         <button
//           className={
//             selectedRange === "7days" ? "button-chart selected" : "button-chart"
//           }
//           onClick={() => handleRangeChange("7days")}
//         >
//           7 Days
//         </button>
//         <button
//           className={
//             selectedRange === "1month"
//               ? "button-chart selected"
//               : "button-chart"
//           }
//           onClick={() => handleRangeChange("1month")}
//         >
//           1 Month
//         </button>
//         <button
//           className={
//             selectedRange === "6months"
//               ? "button-chart selected"
//               : "button-chart"
//           }
//           onClick={() => handleRangeChange("6months")}
//         >
//           6 Months
//         </button>
//         <button
//           className={
//             selectedRange === "1year" ? "button-chart selected" : "button-chart"
//           }
//           onClick={() => handleRangeChange("1year")}
//         >
//           1 Year
//         </button>
//       </div>
//       <div className="chart-page">
//         <div className="chart-box">
//           <UserChart selectedRange={selectedRange} />
//         </div>
//         <div className="chart-box">
//           <VendorChart selectedRange={selectedRange} />
//         </div>
//         <div className="chart-box">
//           <ChallengeBarChart selectedRange={selectedRange} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChartController;

import React, { useState } from "react";
import UserChart from "../Test";
import VendorChart from "../vendor_chart";
import ChallengeBarChart from "../challenge_chart";
import "./chartController.scss"; // Import the SCSS file

const ChartController: React.FC<{}> = () => {
  const [selectedRange, setSelectedRange] = useState<string>("1year");
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const handleRangeChange = (range: string) => {
    setSelectedRange(range);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const chartContainerStyle = isMenuOpen
    ? "chart-container menu-open"
    : "chart-container";

  return (
    <div className="chartdiv">
      {isMenuOpen && <div className="overlay" onClick={toggleMenu} />}{" "}
      {/* Add overlay when menu is open */}
      <div className="button-container">
        <button
          className={
            selectedRange === "7days" ? "button-chart selected" : "button-chart"
          }
          onClick={() => handleRangeChange("7days")}
        >
          7 Days
        </button>
        <button
          className={
            selectedRange === "1month"
              ? "button-chart selected"
              : "button-chart"
          }
          onClick={() => handleRangeChange("1month")}
        >
          1 Month
        </button>
        <button
          className={
            selectedRange === "6months"
              ? "button-chart selected"
              : "button-chart"
          }
          onClick={() => handleRangeChange("6months")}
        >
          6 Months
        </button>
        <button
          className={
            selectedRange === "1year" ? "button-chart selected" : "button-chart"
          }
          onClick={() => handleRangeChange("1year")}
        >
          1 Year
        </button>
      </div>
      <div className={chartContainerStyle}>
        <div className="chart-page">
          <div className="chart-box">
            <UserChart selectedRange={selectedRange} />
          </div>
          <div className="chart-box">
            <VendorChart selectedRange={selectedRange} />
          </div>
          <div className="chart-box">
            <ChallengeBarChart selectedRange={selectedRange} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartController;
