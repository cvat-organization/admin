// utils.ts

// Function to filter data for the previous 7 days or a specific date range
export function filterDataByDateRange(
  data: any[],
  startDate?: string,
  endDate?: string
) {
  let startDateObj: Date;
  let endDateObj: Date;

  // If endDate is not provided, use today's date
  if (!endDate) {
    endDateObj = new Date();
  } else {
    endDateObj = new Date(endDate);
  }

  // If startDate is not provided, calculate the start date as 7 days before endDate
  if (!startDate) {
    startDateObj = new Date(endDateObj);
    startDateObj.setDate(startDateObj.getDate() - 7);
  } else {
    startDateObj = new Date(startDate);
  }

  // Filter data based on date range (from startDate to endDate)
  const filteredData = data.filter((entry) => {
    const entryDate = new Date(entry.date);
    return entryDate >= startDateObj && entryDate <= endDateObj;
  });

  return filteredData;
}
