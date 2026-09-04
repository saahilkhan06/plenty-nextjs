"use client";

import { useState, useRef } from "react";
import { Plane, Search } from "lucide-react";
import SearchField from "../ui/SearchField";
import DropdownActions from "../ui/DropdownActions";
import { useClickOutside } from "../../hooks/useClickOutside";

const REGIONS = ["Any London", "Any Midland", "Any North West", "Any Scotland", "Any South"];

const AIRPORTS = [
  "Aberdeen", "Belfast", "Belfast City", "Birmingham",
  "Bournemouth", "Bristol", "Cardiff", "Cork",
  "Doncaster Sheffield", "Dublin", "East Midlands", "Edinburgh",
  "Exeter", "Glasgow", "Glasgow-Prestwick", "Humberside",
  "Inverness", "Leeds Bradford", "Liverpool", "London - Gatwick",
  "London - Heathrow", "London - Luton", "London - Southend", "London - Stansted",
  "London City", "Londonderry-Eglinton", "Manchester", "Newcastle",
  "Newquay-St Mawgan", "Norwich", "Southampton",
];

export default function DepartureSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useClickOutside(containerRef, () => setIsOpen(false));

  const toggleSelect = (item: string) => {
    setSelected((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const filteredAirports = AIRPORTS.filter((a) =>
    a.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div ref={containerRef} className="relative flex-1">
      <SearchField
        id="departure"
        label="Departure"
        icon={Plane}
        placeholder="Any London Airport"
        value={selected.join(", ")}
        onClick={() => setIsOpen((prev) => !prev)}
        isOpen={isOpen}
        panelClassName="absolute left-0 top-full z-50 mt-2 flex max-h-[420px] w-[700px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-xl bg-white shadow-2xl"
      >
        <div className="flex items-center gap-2 border-b p-4">
          <Search size={18} className="text-gray-500" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Departure airport eg. London"
            className="w-full outline-none text-gray-700 placeholder:text-gray-400"
          />
        </div>

        <div className="overflow-y-auto p-6">
          <h3 className="mb-3 font-bold text-gray-900">Regions</h3>
          <div className="mb-6 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-4">
            {REGIONS.map((item) => (
              <label key={item} className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={selected.includes(item)}
                  onChange={() => toggleSelect(item)}
                  className="h-4 w-4 rounded border-gray-400"
                />
                <span className="text-gray-800">{item}</span>
              </label>
            ))}
          </div>

          <h3 className="mb-3 font-bold text-gray-900">Airports A-Z</h3>
          <div className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-4">
            {filteredAirports.map((airport) => (
              <label key={airport} className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={selected.includes(airport)}
                  onChange={() => toggleSelect(airport)}
                  className="h-4 w-4 rounded border-gray-400"
                />
                <span className="text-gray-800">{airport}</span>
              </label>
            ))}
          </div>
        </div>

        <DropdownActions
          onClear={() => {
            setSelected([]);
            setQuery("");
          }}
          onDone={() => setIsOpen(false)}
        />
      </SearchField>
    </div>
  );
}