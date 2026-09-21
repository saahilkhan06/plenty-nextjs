"use client";
import { Hotel, Umbrella } from "lucide-react";
import { useState } from "react";
import DestinationSearch from "./search/DestinationSearch";
import DepartureSearch from "./search/DepartureSearch";
import TravelDateSearch from "./search/TravelDateSearch";
import StayingForSearch from "./search/StayingForSearch";
import GuestsSearch from "./search/GuestsSearch";

export default function searchbar() {
  const [tab, setTab] = useState<"flight" | "hotel">("flight");

  return (
    <section className="w-full bg-blue-950 bg-cover bg-center px-5 py-8 text-white sm:px-8">
      <div className="mb-10 flex flex-wrap gap-8">
        <button
          onClick={() => setTab("flight")}
          className={`flex cursor-pointer items-center gap-2.5 text-xl font-semibold ${
            tab === "flight" ? "text-white" : "text-gray-400"
          }`}
        >
          <Umbrella size={24} />
          <span className="animated-underline">Flight + Hotel</span>
        </button>

        <button
          onClick={() => setTab("hotel")}
          className={`flex cursor-pointer items-center gap-2.5 text-xl font-semibold ${
            tab === "hotel" ? "text-white" : "text-gray-400"
          }`}
        >
          <Hotel size={24} />
          <span className="animated-underline">Hotel Only</span>
        </button>
      </div>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:gap-3">
        <DestinationSearch />

        <div className="flex gap-4 lg:contents">
          {tab === "flight" && <DepartureSearch />}
          <StayingForSearch />
        </div>

        <TravelDateSearch />
        <GuestsSearch />

        <button className="h-14 w-full rounded-[10px] bg-[#2171C9] font-bold text-white transition-colors hover:bg-[#3A8DE4] lg:w-auto lg:shrink-0 lg:px-8">
          Search
        </button>
      </div>
    </section>
  );
}
