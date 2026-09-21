"use client";

import { useState, useRef, useEffect } from "react";
import { BedDouble } from "lucide-react";
import SearchField from "../ui/SearchField";
import DropdownActions from "../ui/DropdownActions";
import { useClickOutside } from "../../hooks/useClickOutside";
import Link from "next/link";

interface Room {
  adults: number;
  children: number;
}

const MAX_PER_ROOM = 4;

export default function GuestsSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [rooms, setRooms] = useState<Room[]>([{ adults: 2, children: 0 }]);
  const [fullWarning, setFullWarning] = useState<Record<number, boolean>>({});
  const containerRef = useRef<HTMLDivElement>(null);

  useClickOutside(containerRef, () => setIsOpen(false));

  const totalGuests = rooms.reduce((sum, r) => sum + r.adults + r.children, 0);

  // Auto-add a new room block once guest count crosses a multiple of 4
  useEffect(() => {
    const neededRooms = Math.max(1, Math.ceil(totalGuests / MAX_PER_ROOM));
    if (neededRooms > rooms.length) {
      setRooms((prev) => [
        ...prev,
        ...Array.from({ length: neededRooms - prev.length }, () => ({
          adults: 1,
          children: 0,
        })),
      ]);
    }
  }, [totalGuests, rooms.length]);

  const updateRoom = (
    i: number,
    field: "adults" | "children",
    delta: number,
  ) => {
    setRooms((prev) => {
      const room = prev[i];
      const roomTotal = room.adults + room.children;

      if (delta > 0 && roomTotal >= MAX_PER_ROOM) {
        setFullWarning((w) => ({ ...w, [i]: true }));
        return prev;
      }

      setFullWarning((w) => ({ ...w, [i]: false }));

      return prev.map((r, idx) =>
        idx === i
          ? {
              ...r,
              [field]: Math.max(field === "adults" ? 1 : 0, r[field] + delta),
            }
          : r,
      );
    });
  };

  return (
    <div ref={containerRef} className="w-full sm:w-auto sm:flex-1">
      <SearchField
        id="guests"
        label="Guests"
        icon={BedDouble}
        placeholder="2 guests/1 Room"
        value={`${totalGuests} Guests / Room ${rooms.length}`}
        onClick={() => setIsOpen((p) => !p)}
        isOpen={isOpen}
        panelClassName="absolute right-0 top-full z-50 mt-2 w-[380px] rounded-xl bg-white p-6 shadow-2xl"
      >
        <div className="space-y-5">
          {rooms.map((room, i) => (
            <div key={i} className="rounded-lg border border-black p-4">
              <div className="mb-3 flex items-center justify-between">
                <h4 className="text-lg font-bold text-gray-900">
                  Room {i + 1}
                </h4>
                {rooms.length > 1 && (
                  <button
                    type="button"
                    onClick={() =>
                      setRooms((prev) => prev.filter((_, idx) => idx !== i))
                    }
                    className="text-sm text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                )}
              </div>

              {(["adults", "children"] as const).map((field, idx) => (
                <div
                  key={field}
                  className={`flex items-center justify-between ${idx === 0 ? "mb-4" : ""}`}
                >
                  <div>
                    <div className="text-lg font-bold text-gray-900">
                      {field === "adults" ? "Adults" : "Child"}
                    </div>
                    <div className="text-sm text-gray-500">
                      {field === "adults"
                        ? "Above 18 year old"
                        : "Under 18 year old"}
                    </div>
                  </div>

                  <div className="flex items-center rounded-lg border border-gray-300">
                    <button
                      type="button"
                      onClick={() => updateRoom(i, field, -1)}
                      className="px-3 py-2 font-bold text-blue-800"
                    >
                      -
                    </button>
                    <span className="min-w-6 text-center font-semibold text-gray-900">
                      {room[field]}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateRoom(i, field, 1)}
                      className="px-3 py-2 font-bold text-blue-800"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}

              {fullWarning[i] && (
                <p className="mt-3 text-sm font-medium text-red-600">
                  This room has reached its maximum occupancy of {MAX_PER_ROOM}{" "}
                  guests. Please add another room to continue.
                </p>
              )}
            </div>
          ))}
        </div>

        <p className="mt-6 text-sm text-blue-800">
          If you would like to book more rooms, call our sales team on{" "}
          <Link href="tel:02039947646" className="font-semibold text-blue-800">
            0203 994 7646
          </Link>
        </p>
        <button
          type="button"
          onClick={() =>
            setRooms((prev) => [...prev, { adults: 1, children: 0 }])
          }
          className="mt-3 w-full rounded-md border border-gray-300 py-2.5 font-semibold text-gray-900 hover:bg-gray-50"
        >
          + Add Room
        </button>
        <DropdownActions
          onClear={() => {
            setRooms([{ adults: 2, children: 0 }]);
            setFullWarning({});
          }}
          onDone={() => setIsOpen(false)}
        />
      </SearchField>
    </div>
  );
}
