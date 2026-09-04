"use client";

import { useState, useRef, useMemo } from "react";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import SearchField from "../ui/SearchField";
import DropdownActions from "../ui/DropdownActions";
import { useClickOutside } from "../../hooks/useClickOutside";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function monthList(startYear: number, startMonth: number, count: number) {
  const list = [];
  let y = startYear,
    m = startMonth;
  for (let i = 0; i < count; i++) {
    list.push({ year: y, month: m });
    m++;
    if (m > 11) {
      m = 0;
      y++;
    }
  }
  return list;
}

function calendarDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = Array(firstDay).fill(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  return cells;
}

export default function TravelDateSearch() {
  const today = useMemo(() => new Date(), []);
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<Date | null>(null);
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const containerRef = useRef<HTMLDivElement>(null);

  useClickOutside(containerRef, () => setIsOpen(false));

  const months = useMemo(
    () => monthList(today.getFullYear(), today.getMonth(), 18),
    [today],
  );
  const days = useMemo(
    () => calendarDays(viewYear, viewMonth),
    [viewYear, viewMonth],
  );

  const shiftMonth = (delta: number) => {
    let m = viewMonth + delta,
      y = viewYear;
    if (m < 0) {
      m = 11;
      y--;
    }
    if (m > 11) {
      m = 0;
      y++;
    }
    setViewYear(y);
    setViewMonth(m);
  };

  const isPast = (d: number) => {
    const date = new Date(viewYear, viewMonth, d);
    const t = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return date < t;
  };

  const displayValue = selected
    ? selected.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "";

  return (
    <div ref={containerRef} className="w-full sm:w-35">
      <SearchField
        id="travel-date"
        label="Travel Date"
        icon={CalendarDays}
        placeholder="Departure"
        value={displayValue}
        onClick={() => setIsOpen((p) => !p)}
        isOpen={isOpen}
        widthClass="w-full sm:w-[140px]"
        panelClassName="absolute left-1/2 top-full z-50 mt-2 flex w-[95vw] max-w-3xl -translate-x-1/2 flex-col overflow-hidden rounded-lg bg-white shadow-2xl sm:w-auto"
      >
        <div className="flex">
          <div className="grid max-h-96 w-56 grid-cols-1 gap-1 overflow-y-auto border-r p-2">
            {months.map(({ year, month }, i) => {
              const prevYear = i > 0 ? months[i - 1].year : null;
              const isNewYear = year !== prevYear;

              return (
                <div key={`${year}-${month}`}>
                  {isNewYear && (
                    <div className="mb-1 mt-2 px-3 text-xs font-bold text-gray-500 first:mt-0">
                      {year}
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      setViewYear(year);
                      setViewMonth(month);
                    }}
                    className={`w-full rounded-md px-3 py-2 text-sm font-bold ${
                      year === viewYear && month === viewMonth
                        ? "bg-blue-700 text-white"
                        : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
                  >
                    {MONTHS[month]} {year}
                  </button>
                </div>
              );
            })}
          </div>

          <div className="w-80 p-4">
            <div className="mb-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => shiftMonth(-1)}
                className="p-1 text-gray-500 hover:text-black"
              >
                <ChevronLeft size={20} />
              </button>
              <span className="font-semibold">
                {MONTHS[viewMonth].slice(0, 3).toUpperCase()} {viewYear}
              </span>
              <button
                type="button"
                onClick={() => shiftMonth(1)}
                className="p-1 text-gray-500 hover:text-black"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            <div className="mb-2 grid grid-cols-7 text-center text-sm text-gray-500">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                <div key={d}>{d}</div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-y-2 text-center">
              {days.map((d, i) => {
                if (d === null) return <div key={i} />;
                const past = isPast(d);
                const isSelected =
                  selected &&
                  selected.getFullYear() === viewYear &&
                  selected.getMonth() === viewMonth &&
                  selected.getDate() === d;
                return (
                  <button
                    key={i}
                    type="button"
                    disabled={past}
                    onClick={() =>
                      setSelected(new Date(viewYear, viewMonth, d))
                    }
                    className={`mx-auto flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                      past
                        ? "cursor-not-allowed text-gray-300"
                        : isSelected
                          ? "bg-blue-700 text-white"
                          : "text-gray-800 hover:bg-blue-100"
                    }`}
                  >
                    {d}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <DropdownActions
          onClear={() => setSelected(null)}
          onDone={() => setIsOpen(false)}
        />
      </SearchField>
    </div>
  );
}
