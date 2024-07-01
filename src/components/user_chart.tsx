// // // user_chart
// // import React, { useState, useEffect } from "react";
// // import {
// //   ComposedChart,
// //   Line,
// //   Bar,
// //   XAxis,
// //   YAxis,
// //   CartesianGrid,
// //   Tooltip,
// //   Legend,
// //   ResponsiveContainer,
// // } from "recharts";
// // import { userData } from "../data/d"; // Assuming this path is correct

// // interface Props {
// //   selectedRange: string;
// //   startDate: Date | null;
// //   endDate: Date | null;
// // }

// // interface DataItem {
// //   date: string;
// //   count: number;
// // }

// // const UserChart: React.FC<Props> = ({ selectedRange, startDate, endDate }) => {
// //   const [displayData, setDisplayData] = useState<DataItem[]>([]);

// //   useEffect(() => {
// //     if (selectedRange === "custom" && startDate && endDate) {
// //       updateDisplayDataForCustomRange(startDate, endDate);
// //     } else {
// //       updateDisplayData(selectedRange);
// //     }
// //   }, [selectedRange, startDate, endDate]);

// //   const updateDisplayDataForCustomRange = (start: Date, end: Date): void => {
// //     const filteredData = filterDataByRange(start, end);
// //     setDisplayData(filteredData);
// //   };

// //   const updateDisplayData = (range: string): void => {
// //     switch (range) {
// //       case "7days":
// //         setDisplayData(userData.slice(-7));
// //         break;
// //       case "1month":
// //         setDisplayData(userData.slice(-30));
// //         break;
// //       case "6months":
// //         setDisplayData(filterDataByRange(getDateByDaysAgo(180), new Date()));
// //         break;
// //       case "1year":
// //         setDisplayData(filterDataByRange(getDateByDaysAgo(365), new Date()));
// //         break;
// //       case "all":
// //         const firstDate = new Date(userData[0]?.date); // Get the first date from userData
// //         setDisplayData(filterDataByRange(firstDate, new Date()));
// //         break;
// //       default:
// //         setDisplayData(userData);
// //     }
// //   };

// //   const filterDataByRange = (start: Date, end: Date): DataItem[] => {
// //     const filteredData: DataItem[] = [];
// //     const cumulativeData: { [key: string]: number } = {};

// //     // Filter data for the specified range
// //     const rangeData = userData.filter((item: DataItem) => {
// //       const itemDate = new Date(item.date);
// //       return itemDate >= start && itemDate <= end;
// //     });

// //     // Calculate cumulative sum for each month within the range
// //     rangeData.forEach((item) => {
// //       const month = item.date.substring(0, 7); // Extract YYYY-MM from date
// //       cumulativeData[month] = (cumulativeData[month] || 0) + item.count;
// //     });

// //     // Convert cumulativeData object to an array of DataItem objects
// //     Object.keys(cumulativeData).forEach((month) => {
// //       filteredData.push({ date: month, count: cumulativeData[month] });
// //     });

// //     return filteredData;
// //   };

// //   const getDateByDaysAgo = (days: number): Date => {
// //     const date = new Date();
// //     date.setDate(date.getDate() - days);
// //     return date;
// //   };

// //   const renderChart = (): JSX.Element => {
// //     return (
// //       <ResponsiveContainer width="100%" height={400}>
// //         <ComposedChart data={displayData}>
// //           <CartesianGrid strokeDasharray="3 3" />
// //           <XAxis dataKey="date" />
// //           <YAxis />
// //           <Tooltip />
// //           <Legend />
// //           <Bar dataKey="count" fill="#8884d8" name="Number of Users" />
// //           <Line
// //             type="monotone"
// //             dataKey="count"
// //             stroke="#82ca9d"
// //             activeDot={{ r: 8 }}
// //             // name="Number of users (Line)"
// //           />
// //         </ComposedChart>
// //       </ResponsiveContainer>
// //     );
// //   };

// //   return <div>{renderChart()}</div>;
// // };

// // export default UserChart;

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

interface Props {
  selectedRange: string;
  startDate: Date | null;
  endDate: Date | null;
}

interface DataItem {
  date: string;
  count: number;
}

const UserChart: React.FC<Props> = ({ selectedRange, startDate, endDate }) => {
  const [displayData, setDisplayData] = useState<DataItem[]>([]);

  useEffect(() => {
    fetchData();
  }, [selectedRange, startDate, endDate]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/admin/dashboard/get-users-vs-time/Customer",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`, // Get JWT token from local storage
          },
        }
      );
      const data = await response.json();
      const userData = data.data;
      if (selectedRange === "custom" && startDate && endDate) {
        updateDisplayDataForCustomRange(userData, startDate, endDate);
      } else {
        updateDisplayData(userData, selectedRange);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const updateDisplayDataForCustomRange = (
    data: DataItem[],
    start: Date,
    end: Date
  ): void => {
    const filteredData = filterDataByRange(data, start, end, selectedRange);
    setDisplayData(filteredData);
  };

  const updateDisplayData = (data: DataItem[], range: string): void => {
    switch (range) {
      case "7days":
        setDisplayData(
          filterDataByRange(data, getDateByDaysAgo(7), new Date(), range)
        );
        break;
      case "1month":
        setDisplayData(
          filterDataByRange(data, getDateByDaysAgo(30), new Date(), range)
        );
        break;
      case "6months":
        setDisplayData(
          filterDataByRange(data, getDateByDaysAgo(180), new Date(), range)
        );
        break;
      case "1year":
        setDisplayData(
          filterDataByRange(data, getDateByDaysAgo(365), new Date(), range)
        );
        break;
      case "all":
        const firstDate = new Date(data[0]?.date); // Get the first date from data
        setDisplayData(filterDataByRange(data, firstDate, new Date(), range));
        break;
      default:
        setDisplayData(data);
    }
  };

  const filterDataByRange = (
    data: DataItem[],
    start: Date,
    end: Date,
    range: string
  ): DataItem[] => {
    if (range === "7days" || range === "1month") {
      // For "7 days" and "1 month", return data points without merging by month
      return data.filter((item: DataItem) => {
        const itemDate = new Date(item.date);
        return itemDate >= start && itemDate <= end;
      });
    }

    const filteredData: DataItem[] = [];
    const cumulativeData: { [key: string]: number } = {};

    // Filter data for the specified range
    const rangeData = data.filter((item: DataItem) => {
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
          <Bar dataKey="count" fill="#8884d8" name="Number of Users" />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#82ca9d"
            activeDot={{ r: 8 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    );
  };

  return <div>{renderChart()}</div>;
};

export default UserChart;