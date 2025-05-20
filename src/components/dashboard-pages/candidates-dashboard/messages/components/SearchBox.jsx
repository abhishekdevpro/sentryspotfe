import React from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBox = ({ onSearch }) => {
  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    onSearch(searchTerm);
  };

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <FaSearch className="h-4 w-4 text-gray-400" />
      </div>
      <input
        type="search"
        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        placeholder="Search employers..."
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchBox;
