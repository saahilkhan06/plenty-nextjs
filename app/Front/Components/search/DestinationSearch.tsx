"use client";

import { useState, useRef, useEffect } from "react";
import { MapPin, Search } from "lucide-react";
import SearchField from "../ui/SearchField";
import DropdownActions from "../ui/DropdownActions";

const POPULAR_SEARCHES = ["All Balearic Islands", "All Portugal", "All Turkey"];
const TOP_CITIES = ["Amsterdam", "Budapest", "Barcelona", "Rome"];

export default function DestinationSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string[]>([]);

  const toggleSelect = (item: string) => {
    setSelected((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item],
    );
  };

  const filteredCities = TOP_CITIES.filter((c) =>
    c.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="w-full sm:w-auto sm:flex-1">
      <SearchField
        id="destination"
        label="Destination"
        icon={MapPin}
        placeholder="Search Destination"
        value={selected.join(", ")}
        onClick={() => setIsOpen((prev) => !prev)}
        isOpen={isOpen}
      >
        {/* Inner search input */}
        <div className="flex items-center gap-2 rounded-md border-2 border-blue-900 px-3 py-2">
          <Search size={18} className="text-gray-500" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type destination or hotel name"
            className="w-full outline-none text-gray-700 placeholder:text-gray-400"
          />
        </div>

        <div className="mt-4 max-h-80 overflow-y-auto pr-1">
          <h3 className="mb-2 font-bold text-gray-900">
            Most Popular Searches
          </h3>
          <ul className="mb-4 space-y-2">
            {POPULAR_SEARCHES.map((item) => (
              <li key={item}>
                <label className="flex cursor-pointer items-center justify-between rounded-md bg-gray-100 px-4 py-3">
                  <span className="flex items-center gap-2 text-gray-800">
                    <MapPin size={16} className="text-blue-900" />
                    {item}
                  </span>
                  <input
                    type="checkbox"
                    checked={selected.includes(item)}
                    onChange={() => toggleSelect(item)}
                    className="h-5 w-5 rounded border-gray-400"
                  />
                </label>
              </li>
            ))}
          </ul>

          <h3 className="mb-2 font-bold text-gray-900">Top Cities</h3>
          <ul className="space-y-2">
            {filteredCities.map((city) => (
              <li key={city}>
                <label className="flex cursor-pointer items-center justify-between rounded-md bg-gray-100 px-4 py-3">
                  <span className="flex items-center gap-2 text-gray-800">
                    <MapPin size={16} className="text-blue-900" />
                    {city}
                  </span>
                  <input
                    type="checkbox"
                    checked={selected.includes(city)}
                    onChange={() => toggleSelect(city)}
                    className="h-5 w-5 rounded border-gray-400"
                  />
                </label>
              </li>
            ))}
          </ul>
        </div>
      </SearchField>
    </div>
  );
}
