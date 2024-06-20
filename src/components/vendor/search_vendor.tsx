import React, { useState } from "react";

const SearchVendor: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    // API call to search for vendors
    console.log("Searching for vendor:", searchTerm);
  };

  return (
    <div>
      <h1>Search Vendor</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Enter vendor name or ID"
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchVendor;
