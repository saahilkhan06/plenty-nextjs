// import React from "react";
// import { FiCalendar } from "react-icons/fi";
// import AccountMenu from "./Account";
// import MessageMenu from "./Message"

// export const TopBar = () => {
//   const date = new Date();
//   const hour = date.getHours();

//   let greeting;

//   if (hour < 12) {
//     greeting = "Good Morning";
//   } else if (hour < 18) {
//     greeting = "Good Afternoon";
//   } else {
//     greeting = "Good Evening";
//   }

//   const day = date.getDate();

//   const suffix =
//     day % 10 === 1 && day !== 11
//       ? "st"
//       : day % 10 === 2 && day !== 12
//         ? "nd"
//         : day % 10 === 3 && day !== 13
//           ? "rd"
//           : "th";

//   const formattedDate = `${date.toLocaleDateString("en-US", {
//     weekday: "long",
//     month: "long",
//   })}, ${day}${suffix} ${date.getFullYear()}`;

//   return (
//     <div className="border-b px-4 mb-4 mt-2 pb-4 border-stone-200">
//       <div className="flex pt-3 items-center justify-between p-0.5">
//         <div>
//           <span className="text-sm font-bold block">🚀 {greeting}, John!</span>

//           <span className="text-xs block text-stone-500">{formattedDate}</span>
//         </div>

//         <button className="flex text-sm items-center gap-2 bg-stone-100 transition-colors hover:bg-violet-100 hover:text-violet-700 px-3 py-1.5 rounded">
//           <FiCalendar />
//           <span>Prev 6 Months</span>
//         </button>
//         <MessageMenu/>
//         <AccountMenu/>
//       </div>
//     </div>
//   );
// };

"use client";

import React from "react";
import { FiCalendar } from "react-icons/fi";
import AccountMenu from "./Account";
import MessageMenu from "./Message";

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
    <div className="border-b px-3 sm:px-4 mb-4 mt-2 pb-4 border-stone-200">
      <div className="flex flex-col sm:flex-row pt-3 items-start sm:items-center justify-between gap-3 sm:gap-4 p-0.5">

        {/* Greeting */}
        <div className="min-w-0">
          <span className="text-sm font-bold block truncate">
            🚀 {greeting}, John!
          </span>

          <span className="text-xs block text-stone-500">
            {formattedDate}
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 w-full sm:w-auto">

          <button
            className="
              flex
              flex-1
              sm:flex-none
              text-sm
              items-center
              justify-center
              gap-2
              bg-stone-100
              transition-colors
              hover:bg-violet-100
              hover:text-violet-700
              px-3
              py-1.5
              rounded
              whitespace-nowrap
            "
          >
            <FiCalendar />
            <span>Prev 6 Months</span>
          </button>

          <MessageMenu />

          <AccountMenu />

        </div>
      </div>
    </div>
  );
};