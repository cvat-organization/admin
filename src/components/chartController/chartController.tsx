import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import UserChart from "../user_chart";
import VendorChart from "../vendor_chart";
import ChallengeBarChart from "../challenge_chart";
import UserCity from "../user_city";
import UserCountry from "../user_country";
import UserActivity from "../user_activity";

import "./chartController.scss";

interface ChartControllerProps {}

const ChartController: React.FC<ChartControllerProps> = () => {
  const [selectedRange, setSelectedRange] = useState<string>("6months");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const handleRangeChange = (range: string) => {
    setSelectedRange(range);
    // Reset custom date range when a predefined range is selected
    if (range !== "custom") {
      setStartDate(null);
      setEndDate(null);
    }
  };

  const handleCustomDateChange = (start: Date | null, end: Date | null) => {
    setStartDate(start);
    setEndDate(end);
    setSelectedRange("custom"); // Set selectedRange to 'custom' when custom dates are selected
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const chartContainerStyle = isMenuOpen
    ? "chart-container menu-open"
    : "chart-container";

  return (
    <div className="chartdiv">
      {isMenuOpen && <div className="overlay" onClick={toggleMenu} />}
      <div className="button-container">
        <button
          onClick={() => handleRangeChange("7days")}
          className={
            selectedRange === "7days" ? "button-chart selected" : "button-chart"
          }
        >
          7 Days
        </button>
        <button
          onClick={() => handleRangeChange("1month")}
          className={
            selectedRange === "1month"
              ? "button-chart selected"
              : "button-chart"
          }
        >
          1 Month
        </button>
        <button
          onClick={() => handleRangeChange("6months")}
          className={
            selectedRange === "6months"
              ? "button-chart selected"
              : "button-chart"
          }
        >
          6 Months
        </button>
        <button
          onClick={() => handleRangeChange("1year")}
          className={
            selectedRange === "1year" ? "button-chart selected" : "button-chart"
          }
        >
          1 Year
        </button>
        <button
          onClick={() => handleRangeChange("all")}
          className={
            selectedRange === "all" ? "button-chart selected" : "button-chart"
          }
        >
          All
        </button>
        {/* Custom Date Range Pickers */}
        <div className="date-range">Date Range:</div>
        <DatePicker
          selected={startDate}
          onChange={(date: Date) => handleCustomDateChange(date, endDate)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          className="date-picker"
          placeholderText="Start Date"
        />
        <DatePicker
          selected={endDate}
          onChange={(date: Date) => handleCustomDateChange(startDate, date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          className="date-picker"
          placeholderText="End Date"
        />
      </div>
      <div className={chartContainerStyle}>
        <div className="chart-page">
          <div className="chart-box">
            <UserChart
              selectedRange={selectedRange}
              startDate={startDate}
              endDate={endDate}
            />
          </div>
          <div className="chart-box">
            <VendorChart
              selectedRange={selectedRange}
              startDate={startDate}
              endDate={endDate}
            />
          </div>
          {/* <div className="chart-box">
            <ChallengeBarChart
              selectedRange={selectedRange}
              startDate={startDate}
              endDate={endDate}
            />
          </div> */}
        </div>
        <div className="chart-page">
          <div className="chart-box">
            <UserCity
              selectedRange={selectedRange}
              startDate={startDate}
              endDate={endDate}
            />
          </div>
          {/* <div className="chart-box">
            <UserCountry
              selectedRange={selectedRange}
              startDate={startDate}
              endDate={endDate}
            />
          </div> */}
          <div className="chart-box">
            <UserActivity
              selectedRange={selectedRange}
              startDate={startDate}
              endDate={endDate}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartController;