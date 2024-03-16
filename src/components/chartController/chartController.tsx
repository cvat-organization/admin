import React, { useState } from "react";
import UserChart from "../Test";
import VendorChart from "../vendor_chart";
import ChallengeBarChart from "../challenge_chart";
import "./chartController.scss"; // Import the SCSS file

const ChartController: React.FC<{}> = () => {
  const [selectedRange, setSelectedRange] = useState<string>("1year");

  const handleRangeChange = (range: string) => {
    setSelectedRange(range);
  };

  return (
    <div className="chartdiv">
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
  );
};

export default ChartController;

/* chartController.tsx */

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
//     <div className="chart-container">
//       <div className="button-box">
//         <div className="button-compartment">
//           <button
//             className={
//               selectedRange === "7days"
//                 ? "button-chart selected"
//                 : "button-chart"
//             }
//             onClick={() => handleRangeChange("7days")}
//           >
//             7 Days
//           </button>
//         </div>
//         <div className="button-compartment">
//           <button
//             className={
//               selectedRange === "1month"
//                 ? "button-chart selected"
//                 : "button-chart"
//             }
//             onClick={() => handleRangeChange("1month")}
//           >
//             1 Month
//           </button>
//         </div>
//         <div className="button-compartment">
//           <button
//             className={
//               selectedRange === "6months"
//                 ? "button-chart selected"
//                 : "button-chart"
//             }
//             onClick={() => handleRangeChange("6months")}
//           >
//             6 Months
//           </button>
//         </div>
//         <div className="button-compartment">
//           <button
//             className={
//               selectedRange === "1year"
//                 ? "button-chart selected"
//                 : "button-chart"
//             }
//             onClick={() => handleRangeChange("1year")}
//           >
//             1 Year
//           </button>
//         </div>
//       </div>
//       <div className="chart-boxes">
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
