import React from "react";
import { FiCalendar } from "react-icons/fi";
import AccountMenu from "./Account";

export const TopBar = () => {
  const date = new Date();
  const hour = date.getHours();

  let greeting;

  if (hour < 12) {
    greeting = "Good Morning";
  } else if (hour < 18) {
    greeting = "Good Afternoon";
  } else {
    greeting = "Good Evening";
  }

  const day = date.getDate();

  const suffix =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
        ? "nd"
        : day % 10 === 3 && day !== 13
          ? "rd"
          : "th";

  const formattedDate = `${date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
  })}, ${day}${suffix} ${date.getFullYear()}`;

  return (
    <div className="border-b px-4 mb-4 mt-2 pb-4 border-stone-200">
      <div className="flex items-center justify-between p-0.5">
        <div>
          <span className="text-sm font-bold block">🚀 {greeting}, John!</span>

          <span className="text-xs block text-stone-500">{formattedDate}</span>
        </div>

        <button className="flex text-sm items-center gap-2 bg-stone-100 transition-colors hover:bg-violet-100 hover:text-violet-700 px-3 py-1.5 rounded">
          <FiCalendar />
          <span>Prev 6 Months</span>
        </button>
        <AccountMenu/>
      </div>
    </div>
  );
};
