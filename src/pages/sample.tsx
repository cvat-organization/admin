// ChartPage.tsx

import React from "react";
import ChartController from "../components/chartController/chartController";
import "../Design/ChartPage.scss"; // Import the SCSS file for this page

const ChartPage: React.FC<{}> = () => {
  return (
    <div className="chart-page">
      {/* <div> */}
      <ChartController />
      {/* </div> */}
      {/* Add more chart boxes here if needed */}
    </div>
  );
};

export default ChartPage;
