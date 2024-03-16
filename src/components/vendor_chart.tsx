// num of vendors

import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { vendorData } from "../data/d";

interface Props {
  selectedRange: string;
}

interface DataItem {
  date: string;
  count: number;
}

const VendorChart: React.FC<Props> = ({ selectedRange }) => {
  const [displayData, setDisplayData] = useState<DataItem[]>([]);

  useEffect(() => {
    updateDisplayData(selectedRange);
  }, [selectedRange]);

  const updateDisplayData = (range: string): void => {
    switch (range) {
      case "7days":
        setDisplayData(vendorData.slice(-7)); // Display last 7 days directly from vendorData
        break;
      case "1month":
        setDisplayData(vendorData.slice(-30)); // Display last 30 days (approx. 1 month) directly from vendorData
        break;
      case "6months":
        setDisplayData(filterDataByRange(180)); // Display last 180 days (approx. 6 months) from the original dataset
        break;
      case "1year":
        setDisplayData(filterDataByRange(365)); // Display last 365 days (approx. 1 year) from the original dataset
        break;
      default:
        setDisplayData(vendorData);
        break;
    }
  };

  const filterDataByRange = (days: number): DataItem[] => {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const filteredData: DataItem[] = [];
    const cumulativeData: { [key: string]: number } = {};

    // Filter data for the specified range
    const rangeData = vendorData.filter((item: DataItem) => {
      const itemDate = new Date(item.date);
      return itemDate >= startDate && itemDate <= endDate;
    });

    // Calculate cumulative sum for each month within the range
    rangeData.forEach((item) => {
      const month = item.date.substring(0, 7); // Extract YYYY-MM from date
      cumulativeData[month] = (cumulativeData[month] || 0) + item.count;
    });

    // Convert cumulativeData object to an array of DataItem objects
    Object.keys(cumulativeData).forEach((month) => {
      filteredData.push({ date: month, count: cumulativeData[month] });
    });

    return filteredData;
  };

  const renderChart = (): JSX.Element => {
    return (
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={displayData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
            name="number of vendors"
          />
        </LineChart>
      </ResponsiveContainer>
    );
  };

  return <div>{renderChart()}</div>;
};

export default VendorChart;
