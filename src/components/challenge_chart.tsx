import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { challengeData } from "../data/d";

interface Props {
  selectedRange: string;
}

interface DataItem {
  date: string;
  overall_count: number;
  vendor_count: number;
}

const ChallengeBarChart: React.FC<Props> = ({ selectedRange }) => {
  const [displayData, setDisplayData] = useState<DataItem[]>([]);

  useEffect(() => {
    updateDisplayData(selectedRange);
  }, [selectedRange]);

  const updateDisplayData = (range: string): void => {
    switch (range) {
      case "7days":
        setDisplayData(challengeData.slice(-7));
        break;
      case "1month":
        setDisplayData(challengeData.slice(-30));
        break;
      case "6months":
        setDisplayData(filterDataByRange(180));
        break;
      case "1year":
        setDisplayData(filterDataByRange(365));
        break;
      default:
        setDisplayData(challengeData);
        break;
    }
  };

  const filterDataByRange = (days: number): DataItem[] => {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const filteredData: DataItem[] = [];
    const cumulativeData: { [key: string]: DataItem } = {};

    const rangeData = challengeData.filter((item: DataItem) => {
      const itemDate = new Date(item.date);
      return itemDate >= startDate && itemDate <= endDate;
    });

    rangeData.forEach((item) => {
      const month = item.date.substring(0, 7);
      if (!cumulativeData[month]) {
        cumulativeData[month] = {
          date: month,
          overall_count: 0,
          vendor_count: 0,
        };
      }
      cumulativeData[month].overall_count += item.overall_count;
      cumulativeData[month].vendor_count += item.vendor_count;
    });

    Object.keys(cumulativeData).forEach((month) => {
      filteredData.push(cumulativeData[month]);
    });

    return filteredData;
  };

  const renderChart = (): JSX.Element => {
    return (
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={displayData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="overall_count" fill="#8884d8" name="Overall" />
          <Bar dataKey="vendor_count" fill="#82ca9d" name="Vendor" />
        </BarChart>
      </ResponsiveContainer>
    );
  };

  return <div>{renderChart()}</div>;
};

export default ChallengeBarChart;
