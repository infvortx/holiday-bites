import { useState } from "react";

export default function SearchWrapper({ onSearch, onFilter, onSort, cuisines }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleCuisineChange = (e) => {
    const value = e.target.value;
    setSelectedCuisine(value);
    onFilter(value);
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortOrder(value);
    onSort(value);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-base-200 rounded-md">
      <input
        type="text"
        placeholder="Search recipes..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="input input-bordered w-full sm:w-1/3"
      />

      <select
        value={selectedCuisine}
        onChange={handleCuisineChange}
        className="select select-bordered w-full sm:w-1/4"
      >
        <option value="">All Cuisines</option>
        {cuisines.map((cuisine) => (
          <option key={cuisine} value={cuisine}>
            {cuisine}
          </option>
        ))}
      </select>

      <select
        value={sortOrder}
        onChange={handleSortChange}
        className="select select-bordered w-full sm:w-1/4"
      >
        <option value="asc">Time: Ascending</option>
        <option value="desc">Time: Descending</option>
      </select>
    </div>
  );
}