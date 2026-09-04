"use client";

import { useState, useRef } from "react";
import { Moon } from "lucide-react";
import SearchField from "../ui/SearchField";
import DropdownActions from "../ui/DropdownActions";
import { useClickOutside } from "../../hooks/useClickOutside";

const NIGHTS = Array.from({ length: 14 }, (_, i) => i + 1);

export default function StayingForSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [nights, setNights] = useState(7);
  const containerRef = useRef<HTMLDivElement>(null);

  useClickOutside(containerRef, () => setIsOpen(false));

  return (
    <div ref={containerRef} className="relative flex-1">
      <SearchField
        id="staying-for"
        label="Staying For"
        icon={Moon}
        placeholder="7 nights"
        value={`${nights} Night${nights > 1 ? "s" : ""}`}
        onClick={() => setIsOpen((p) => !p)}
        isOpen={isOpen}
        widthClass="w-full"
        panelClassName="absolute right-0 top-full z-50 mt-2 w-50 max-h-72 overflow-y-auto rounded-lg bg-white p-2 shadow-2xl"
      >
        {NIGHTS.map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => {
              setNights(n);
              setIsOpen(false);
            }}
            className={`w-full rounded-md px-4 py-2.5 text-center font-medium ${
              n === nights ? "bg-blue-100 text-blue-900" : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {n} Night{n > 1 ? "s" : ""}
          </button>
        ))}
        <DropdownActions
          onClear={() => setNights(7)}
          onDone={() => setIsOpen(false)}
        />
      </SearchField>
    </div>
  );
}