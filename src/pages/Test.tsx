// import React from "react";

// const Test = () => {
//   return <div>Test</div>;
// };

// export default Test;

// import React, { useState, useEffect } from "react";
// import { AreaChart, Area, XAxis, YAxis, Tooltip, Legend } from "recharts";
// // import moment from moment
// const Test = () => {
//   let [data, setData] = useState([]);

//   useEffect(() => {
//     fetchData();
//   }, [])

//   const fetchData = () => {
//     fetch(`https://api.covid19api.com/total/country/france`)
//       .then(response => response.json())
//       .then(json => setData(json))
//   }

//   data = data.filter(a => (a.Active !== 0));

//   console.log(data);
//   return (
//     <div className="App">
//       <AreaChart
//         width={800}
//         height={400}
//         data={data}
//         margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//       >
//         <XAxis dataKey="name" />
//         <YAxis />
//         <Tooltip />
//         <Legend />
//         <Area type="monotone" dataKey="pv" stroke="#8884d8" />
//       </AreaChart>
//     </div>
//   );
// };

// export default Test;

import React, { useState, useEffect } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, Legend } from "recharts";

interface CovidData {
  Country: string;
  CountryCode: string;
  Lat: string;
  Lon: string;
  Cases: number;
  Status: string;
  Date: string;
  Active?: number;
  Deaths?: number;
  Recovered?: number;
}

const Test = () => {
  const data: CovidData[] = [
    {
      Country: "Switzerland",
      CountryCode: "",
      Lat: "0",
      Lon: "0",
      Cases: 0,
      Status: "confirmed",
      Date: "2020-01-22T00:00:00Z",
    },
    {
      Country: "Switzerland",
      CountryCode: "",
      Lat: "0",
      Lon: "0",
      Cases: 0,
      Status: "confirmed",
      Date: "2020-01-23T00:00:00Z",
    },
    {
      Country: "Switzerland",
      CountryCode: "",
      Lat: "0",
      Lon: "0",
      Cases: 0,
      Status: "confirmed",
      Date: "2020-01-24T00:00:00Z",
    },
    {
      Country: "Switzerland",
      CountryCode: "",
      Lat: "0",
      Lon: "0",
      Cases: 0,
      Status: "confirmed",
      Date: "2020-01-25T00:00:00Z",
    },
    {
      Country: "Switzerland",
      CountryCode: "",
      Lat: "0",
      Lon: "0",
      Cases: 0,
      Status: "confirmed",
      Date: "2020-01-26T00:00:00Z",
    },
    {
      Country: "Switzerland",
      CountryCode: "",
      Lat: "0",
      Lon: "0",
      Cases: 0,
      Status: "confirmed",
      Date: "2020-01-27T00:00:00Z",
    },
    {
      Country: "Switzerland",
      CountryCode: "",
      Lat: "0",
      Lon: "0",
      Cases: 0,
      Status: "confirmed",
      Date: "2020-01-28T00:00:00Z",
    },
    {
      Country: "Switzerland",
      CountryCode: "",
      Lat: "0",
      Lon: "0",
      Cases: 0,
      Status: "confirmed",
      Date: "2020-01-29T00:00:00Z",
    },
    {
      Country: "Switzerland",
      CountryCode: "",
      Lat: "0",
      Lon: "0",
      Cases: 0,
      Status: "confirmed",
      Date: "2020-01-30T00:00:00Z",
    },
    {
      Country: "Switzerland",
      CountryCode: "",
      Lat: "0",
      Lon: "0",
      Cases: 0,
      Status: "confirmed",
      Date: "2020-01-31T00:00:00Z",
    },
    {
      Country: "Switzerland",
      CountryCode: "",
      Lat: "0",
      Lon: "0",
      Cases: 0,
      Status: "confirmed",
      Date: "2020-02-01T00:00:00Z",
    },
    {
      Country: "Switzerland",
      CountryCode: "",
      Lat: "0",
      Lon: "0",
      Cases: 0,
      Status: "confirmed",
      Date: "2020-02-02T00:00:00Z",
    },
    {
      Country: "Switzerland",
      CountryCode: "",
      Lat: "0",
      Lon: "0",
      Cases: 0,
      Status: "confirmed",
      Date: "2020-02-03T00:00:00Z",
    },
    {
      Country: "Switzerland",
      CountryCode: "",
      Lat: "0",
      Lon: "0",
      Cases: 0,
      Status: "confirmed",
      Date: "2020-02-04T00:00:00Z",
    },
    {
      Country: "Switzerland",
      CountryCode: "",
      Lat: "0",
      Lon: "0",
      Cases: 0,
      Status: "confirmed",
      Date: "2020-02-05T00:00:00Z",
    },
    {
      Country: "Switzerland",
      CountryCode: "",
      Lat: "0",
      Lon: "0",
      Cases: 0,
      Status: "confirmed",
      Date: "2020-02-06T00:00:00Z",
    },
    {
      Country: "Switzerland",
      CountryCode: "",
      Lat: "0",
      Lon: "0",
      Cases: 0,
      Status: "confirmed",
      Date: "2020-02-07T00:00:00Z",
    },
    {
      Country: "Switzerland",
      CountryCode: "",
      Lat: "0",
      Lon: "0",
      Cases: 0,
      Status: "confirmed",
      Date: "2020-02-08T00:00:00Z",
    },
    {
      Country: "Switzerland",
      CountryCode: "",
      Lat: "0",
      Lon: "0",
      Cases: 0,
      Status: "confirmed",
      Date: "2020-02-09T00:00:00Z",
    },
    {
      Country: "Switzerland",
      CountryCode: "",
      Lat: "0",
      Lon: "0",
      Cases: 0,
      Status: "confirmed",
      Date: "2020-02-10T00:00:00Z",
    },
    {
      Country: "Switzerland",
      CountryCode: "",
      Lat: "0",
      Lon: "0",
      Cases: 0,
      Status: "confirmed",
      Date: "2020-02-11T00:00:00Z",
    },
    {
      Country: "Switzerland",
      CountryCode: "",
      Lat: "0",
      Lon: "0",
      Cases: 0,
      Status: "confirmed",
      Date: "2020-02-12T00:00:00Z",
    },
    {
      Country: "Switzerland",
      CountryCode: "",
      Lat: "0",
      Lon: "0",
      Cases: 0,
      Status: "confirmed",
      Date: "2020-02-13T00:00:00Z",
    },
    {
      Country: "Switzerland",
      CountryCode: "",
      Lat: "0",
      Lon: "0",
      Cases: 0,
      Status: "confirmed",
      Date: "2020-02-14T00:00:00Z",
    },
    {
      Country: "Switzerland",
      CountryCode: "",
      Lat: "0",
      Lon: "0",
      Cases: 0,
      Status: "confirmed",
      Date: "2020-02-15T00:00:00Z",
    },
    {
      Country: "Switzerland",
      CountryCode: "",
      Lat: "0",
      Lon: "0",
      Cases: 0,
      Status: "confirmed",
      Date: "2020-02-16T00:00:00Z",
    },
    {
      Country: "Switzerland",
      CountryCode: "",
      Lat: "0",
      Lon: "0",
      Cases: 0,
      Status: "confirmed",
      Date: "2020-02-17T00:00:00Z",
    },
    {
      Country: "Switzerland",
      CountryCode: "",
      Lat: "0",
      Lon: "0",
      Cases: 0,
      Status: "confirmed",
      Date: "2020-02-18T00:00:00Z",
    },
    {
      Country: "Switzerland",
      CountryCode: "",
      Lat: "0",
      Lon: "0",
      Cases: 0,
      Status: "confirmed",
      Date: "2020-02-19T00:00:00Z",
    },
    {
      Country: "Switzerland",
      CountryCode: "",
      Lat: "0",
      Lon: "0",
      Cases: 0,
      Status: "confirmed",
      Date: "2020-02-20T00:00:00Z",
    },
    {
      Country: "Switzerland",
      CountryCode: "",
      Lat: "0",
      Lon: "0",
      Cases: 0,
      Status: "confirmed",
      Date: "2020-02-21T00:00:00Z",
    },
    {
      Country: "Switzerland",
      CountryCode: "",
      Lat: "0",
      Lon: "0",
      Cases: 0,
      Status: "confirmed",
      Date: "2020-02-22T00:00:00Z",
    },
    {
      Country: "Switzerland",
      CountryCode: "",
      Lat: "0",
      Lon: "0",
      Cases: 0,
      Status: "confirmed",
      Date: "2020-02-23T00:00:00Z",
    },
    {
      Country: "Switzerland",
      CountryCode: "",
      Lat: "0",
      Lon: "0",
      Cases: 0,
      Status: "confirmed",
      Date: "2020-02-24T00:00:00Z",
    },
    {
      Country: "Switzerland",
      CountryCode: "",
      Lat: "0",
      Lon: "0",
      Cases: 1,
      Status: "confirmed",
      Date: "2020-02-25T00:00:00Z",
    },
    {
      Country: "Switzerland",
      CountryCode: "",
      Lat: "0",
      Lon: "0",
      Cases: 1,
      Status: "confirmed",
      Date: "2020-02-26T00:00:00Z",
    },
    {
      Country: "Switzerland",
      CountryCode: "",
      Lat: "0",
      Lon: "0",
      Cases: 8,
      Status: "confirmed",
      Date: "2020-02-27T00:00:00Z",
    },
    {
      Country: "Switzerland",
      CountryCode: "",
      Lat: "0",
      Lon: "0",
      Cases: 8,
      Status: "confirmed",
      Date: "2020-02-28T00:00:00Z",
    },
    {
      Country: "Switzerland",
      CountryCode: "",
      Lat: "0",
      Lon: "0",
      Cases: 18,
      Status: "confirmed",
      Date: "2020-02-29T00:00:00Z",
    },
    {
      Country: "Switzerland",
      CountryCode: "",
      Lat: "0",
      Lon: "0",
      Cases: 27,
      Status: "confirmed",
      Date: "2020-03-01T00:00:00Z",
    },
    {
      Country: "Switzerland",
      CountryCode: "",
      Lat: "0",
      Lon: "0",
      Cases: 42,
      Status: "confirmed",
      Date: "2020-03-02T00:00:00Z",
    },
    {
      Country: "Switzerland",
      CountryCode: "",
      Lat: "0",
      Lon: "0",
      Cases: 56,
      Status: "confirmed",
      Date: "2020-03-03T00:00:00Z",
    },
    {
      Country: "Switzerland",
      CountryCode: "",
      Lat: "0",
      Lon: "0",
      Cases: 90,
      Status: "confirmed",
      Date: "2020-03-04T00:00:00Z",
    },
    {
      Country: "Switzerland",
      CountryCode: "",
      Lat: "0",
      Lon: "0",
      Cases: 114,
      Status: "confirmed",
      Date: "2020-03-05T00:00:00Z",
    },
    {
      Country: "Switzerland",
      CountryCode: "",
      Lat: "0",
      Lon: "0",
      Cases: 214,
      Status: "confirmed",
      Date: "2020-03-06T00:00:00Z",
    },
    {
      Country: "Switzerland",
      CountryCode: "",
      Lat: "0",
      Lon: "0",
      Cases: 268,
      Status: "confirmed",
      Date: "2020-03-07T00:00:00Z",
    },
    {
      Country: "Switzerland",
      CountryCode: "",
      Lat: "0",
      Lon: "0",
      Cases: 337,
      Status: "confirmed",
      Date: "2020-03-08T00:00:00Z",
    },
    {
      Country: "Switzerland",
      CountryCode: "",
      Lat: "0",
      Lon: "0",
      Cases: 374,
      Status: "confirmed",
      Date: "2020-03-09T00:00:00Z",
    },
    {
      Country: "Switzerland",
      CountryCode: "",
      Lat: "0",
      Lon: "0",
      Cases: 491,
      Status: "confirmed",
      Date: "2020-03-10T00:00:00Z",
    },
    {
      Country: "Switzerland",
      CountryCode: "",
      Lat: "0",
      Lon: "0",
      Cases: 652,
      Status: "confirmed",
      Date: "2020-03-11T00:00:00Z",
    },
    {
      Country: "Switzerland",
      CountryCode: "",
      Lat: "0",
      Lon: "0",
      Cases: 652,
      Status: "confirmed",
      Date: "2020-03-12T00:00:00Z",
    },
    {
      Country: "Switzerland",
      CountryCode: "",
      Lat: "0",
      Lon: "0",
      Cases: 1139,
      Status: "confirmed",
      Date: "2020-03-13T00:00:00Z",
    },
    {
      Country: "Switzerland",
      CountryCode: "",
      Lat: "0",
      Lon: "0",
      Cases: 1359,
      Status: "confirmed",
      Date: "2020-03-14T00:00:00Z",
    },
    {
      Country: "Switzerland",
      CountryCode: "",
      Lat: "0",
      Lon: "0",
      Cases: 2200,
      Status: "confirmed",
      Date: "2020-03-15T00:00:00Z",
    },
    {
      Country: "Switzerland",
      CountryCode: "",
      Lat: "0",
      Lon: "0",
      Cases: 2200,
      Status: "confirmed",
      Date: "2020-03-16T00:00:00Z",
    },
    {
      Country: "Switzerland",
      CountryCode: "",
      Lat: "0",
      Lon: "0",
      Cases: 2700,
      Status: "confirmed",
      Date: "2020-03-17T00:00:00Z",
    },
    {
      Country: "Switzerland",
      CountryCode: "",
      Lat: "0",
      Lon: "0",
      Cases: 3028,
      Status: "confirmed",
      Date: "2020-03-18T00:00:00Z",
    },
    {
      Country: "Switzerland",
      CountryCode: "",
      Lat: "0",
      Lon: "0",
      Cases: 4075,
      Status: "confirmed",
      Date: "2020-03-19T00:00:00Z",
    },
    {
      Country: "Switzerland",
      CountryCode: "",
      Lat: "0",
      Lon: "0",
      Cases: 5294,
      Status: "confirmed",
      Date: "2020-03-20T00:00:00Z",
    },
    {
      Country: "Switzerland",
      CountryCode: "",
      Lat: "0",
      Lon: "0",
      Cases: 6575,
      Status: "confirmed",
      Date: "2020-03-21T00:00:00Z",
    },
    {
      Country: "Switzerland",
      CountryCode: "",
      Lat: "0",
      Lon: "0",
      Cases: 7474,
      Status: "confirmed",
      Date: "2020-03-22T00:00:00Z",
    },
    {
      Country: "Switzerland",
      CountryCode: "",
      Lat: "0",
      Lon: "0",
      Cases: 8795,
      Status: "confirmed",
      Date: "2020-03-23T00:00:00Z",
    },
    {
      Country: "Switzerland",
      CountryCode: "",
      Lat: "0",
      Lon: "0",
      Cases: 9877,
      Status: "confirmed",
      Date: "2020-03-24T00:00:00Z",
    },
    {
      Country: "Switzerland",
      CountryCode: "",
      Lat: "0",
      Lon: "0",
      Cases: 10897,
      Status: "confirmed",
      Date: "2020-03-25T00:00:00Z",
    },
    {
      Country: "Switzerland",
      CountryCode: "",
      Lat: "0",
      Lon: "0",
      Cases: 11811,
      Status: "confirmed",
      Date: "2020-03-26T00:00:00Z",
    },
    {
      Country: "Switzerland",
      CountryCode: "",
      Lat: "0",
      Lon: "0",
      Cases: 12928,
      Status: "confirmed",
      Date: "2020-03-27T00:00:00Z",
    },
    {
      Country: "Switzerland",
      CountryCode: "",
      Lat: "0",
      Lon: "0",
      Cases: 14076,
      Status: "confirmed",
      Date: "2020-03-28T00:00:00Z",
    },
    {
      Country: "Switzerland",
      CountryCode: "",
      Lat: "0",
      Lon: "0",
      Cases: 14829,
      Status: "confirmed",
      Date: "2020-03-29T00:00:00Z",
    },
    {
      Country: "Switzerland",
      CountryCode: "",
      Lat: "0",
      Lon: "0",
      Cases: 15922,
      Status: "confirmed",
      Date: "2020-03-30T00:00:00Z",
    },
    {
      Country: "Switzerland",
      CountryCode: "",
      Lat: "0",
      Lon: "0",
      Cases: 16605,
      Status: "confirmed",
      Date: "2020-03-31T00:00:00Z",
    },
    {
      Country: "Switzerland",
      CountryCode: "",
      Lat: "0",
      Lon: "0",
      Cases: 17768,
      Status: "confirmed",
      Date: "2020-04-01T00:00:00Z",
    },
    {
      Country: "Switzerland",
      CountryCode: "",
      Lat: "0",
      Lon: "0",
      Cases: 18827,
      Status: "confirmed",
      Date: "2020-04-02T00:00:00Z",
    },
    {
      Country: "Switzerland",
      CountryCode: "",
      Lat: "0",
      Lon: "0",
      Cases: 19606,
      Status: "confirmed",
      Date: "2020-04-03T00:00:00Z",
    },
    {
      Country: "Switzerland",
      CountryCode: "",
      Lat: "0",
      Lon: "0",
      Cases: 20505,
      Status: "confirmed",
      Date: "2020-04-04T00:00:00Z",
    },
  ];

  // Function to add values for Active, Deaths, and Recovered
  const processData = (data: CovidData[]): CovidData[] => {
    data.forEach((item) => {
      // Assuming Active is Cases - Deaths - Recovered
      item.Active = item.Cases - item.Deaths! - item.Recovered!;
      // Setting Recovered as 80% of the original Cases value
      item.Recovered = Math.round(item.Cases * 0.8);
      // Setting Deaths as the difference between Cases and Recovered
      item.Deaths = item.Cases - item.Recovered!;
    });
    return data;
  };

  // Call the function to process the data
  const processedData = processData(data);
  // Assuming 'data' is your array of COVID-19 data points

  // Loop through each data point

  // Now each data point in the 'data' array will have additional properties 'Active', 'Recovered', and 'Deaths' with their corresponding values

  //   // Filter data where Active cases are not 0
  //   const filteredData = processedData.filter((item) => item.Deaths !== 0);

  const [filteredData, setFilteredData] = useState<CovidData[]>([]);

  const filterData = (attribute: string) => {
    return processedData.filter((item) => {
      if (attribute === "Active") {
        return item.Active !== 0;
      } else if (attribute === "Recovered") {
        return item.Recovered !== 0;
      } else if (attribute === "Deaths") {
        return item.Deaths !== 0;
      }
      // Add additional conditions for other attributes if needed
    });
  };

  const handleFilterClick = (attribute: string) => {
    const newData = filterData(attribute);
    setFilteredData(newData);
  };
  const BUTTONS = [
    {
      name: "vendors",
      onClick: () => handleFilterClick("Active"),
      id: 1,
    },
    {
      name: "users",
      onClick: () => handleFilterClick("Recovered"),
      id: 2,
    },
    {
      name: "Total",
      onClick: () => handleFilterClick("Deaths"),
      id: 3,
    },
    // Add more buttons for additional attributes if needed
  ];

  // Assuming you have your data stored in a variable called 'data'
  // Calculate the latest values for Active, Deaths, and Recovered

  console.log(filteredData);

  return (
    <div className="App">
      {BUTTONS.map((button) => (
        <button key={button.id} onClick={button.onClick}>
          {button.name}
        </button>
      ))}
      <AreaChart
        width={800}
        height={400}
        data={filteredData} // Use filtered data for the chart
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis dataKey="Date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area
          name="user-type"
          type="monotone"
          dataKey="Cases"
          stroke="#8884d8"
        />{" "}
        {/* Use "Active" as dataKey */}
      </AreaChart>
    </div>
  );
};

export default Test;
