import React, { useState, useEffect } from "react";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { challenges } from "../data/d";

interface Props {
  selectedRange: string;
  startDate: Date | null;
  endDate: Date | null;
}

interface DataItem {
  date: string;
  count: number;
}

const ChallengeBarChart: React.FC<Props> = ({
  selectedRange,
  startDate,
  endDate,
}) => {
  const [displayData, setDisplayData] = useState<DataItem[]>([]);

  useEffect(() => {
    if (selectedRange === "custom" && startDate && endDate) {
      updateDisplayDataForCustomRange(startDate, endDate);
    } else {
      updateDisplayData(selectedRange);
    }
  }, [selectedRange, startDate, endDate]);

  const updateDisplayDataForCustomRange = (start: Date, end: Date): void => {
    const filteredData = filterDataByRange(start, end);
    setDisplayData(filteredData);
  };

  const updateDisplayData = (range: string): void => {
    switch (range) {
      case "7days":
        setDisplayData(challenges.slice(-7));
        break;
      case "1month":
        setDisplayData(challenges.slice(-30));
        break;
      case "6months":
        setDisplayData(filterDataByRange(getDateByDaysAgo(180), new Date()));
        break;
      case "1year":
        setDisplayData(filterDataByRange(getDateByDaysAgo(365), new Date()));
        break;
      case "all":
        const firstDate = new Date(challenges[0]?.date); // Get the first date from userData
        setDisplayData(filterDataByRange(firstDate, new Date()));
        break;
      default:
        setDisplayData(challenges);
        break;
    }
  };

  const filterDataByRange = (start: Date, end: Date): DataItem[] => {
    const filteredData: DataItem[] = [];
    const cumulativeData: { [key: string]: number } = {};

    // Filter data for the specified range
    const rangeData = challenges.filter((item: DataItem) => {
      const itemDate = new Date(item.date);
      return itemDate >= start && itemDate <= end;
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

  const getDateByDaysAgo = (days: number): Date => {
    const date = new Date();
    date.setDate(date.getDate() - days);
    return date;
  };

  const renderChart = (): JSX.Element => {
    return (
      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart data={displayData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" name="Number of Challenges" />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#82ca9d"
            activeDot={{ r: 8 }}
            // name="Number of Challenges (Line)"
          />
        </ComposedChart>
      </ResponsiveContainer>
    );
  };

  return <div>{renderChart()}</div>;
};

export default ChallengeBarChart;
