import React, { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import CountryData from "../data/user_country.json";

interface Props {
  selectedRange: string;
  startDate: Date | null;
  endDate: Date | null;
}

interface DataItem {
  date: string;
  country: string;
  users: number;
}

const UserCountry: React.FC<Props> = ({
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
    const filteredData: DataItem[] = CountryData.filter((item: DataItem) => {
      const itemDate = new Date(item.date);
      return itemDate >= start && itemDate <= end;
    });
    aggregateAndSetData(filteredData, start);
  };

  const updateDisplayData = (range: string): void => {
    let startDate: Date | null = null;
    let endDate: Date | null = null;

    switch (range) {
      case "7days":
        if (CountryData.length > 0) {
          startDate = new Date(CountryData[CountryData.length - 1].date); // Use the last date from CountryData
          startDate.setDate(startDate.getDate() - 6); // Last 7 days
        }
        endDate = new Date();
        break;
      case "1month":
        startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 1); // Last 1 month
        endDate = new Date();
        break;
      case "6months":
        startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 6); // Last 6 months
        endDate = new Date();
        break;
      case "1year":
        startDate = new Date();
        startDate.setFullYear(startDate.getFullYear() - 1); // Last 1 year
        endDate = new Date();
        break;
      case "all":
        const firstDate = new Date(CountryData[0]?.date); // Get the first date from cityData
        startDate = firstDate;
        endDate = new Date();
        break;
      default:
      // Do nothing
    }

    if (startDate && endDate) {
      updateDisplayDataForCustomRange(startDate, endDate);
    }
  };

  const aggregateAndSetData = (data: DataItem[], startDate: Date): void => {
    const aggregatedData: { [country: string]: number } = {};

    // Aggregate users by country
    data.forEach((item: DataItem) => {
      if (aggregatedData[item.country]) {
        aggregatedData[item.country] += item.users;
      } else {
        aggregatedData[item.country] = item.users;
      }
    });

    // Convert aggregated data into DataItem array
    const displayData: DataItem[] = Object.keys(aggregatedData).map(
      (country: string) => ({
        date: startDate.toISOString(), // Set the date to the start date of the range
        country,
        users: aggregatedData[country],
      })
    );

    setDisplayData(displayData);
  };

  const renderChart = (): JSX.Element => {
    const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#0088aa"]; // Add more colors as needed

    return (
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={displayData}
            dataKey="users"
            nameKey="country"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {displayData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
          <text
            x="50%"
            y="85%"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#666"
            fontSize={16}
          >
            Users vs Country
          </text>
        </PieChart>
      </ResponsiveContainer>
    );
  };

  return <div>{renderChart()}</div>;
};

export default UserCountry;
