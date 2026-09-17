// import React from "react";
// import { FaArrowRight } from "react-icons/fa";
// export const RouteSelect = () => {
//   return (
//     <div className="space-y-1">
//       <Route Icon={FaArrowRight} selected={true} title="Dashboard" />
//       <Route Icon={FaArrowRight} selected={false} title="Destinations" />
//       <Route Icon={FaArrowRight} selected={false} title="Locations" />
//       <Route Icon={FaArrowRight} selected={false} title="Holiday" />
//       <Route Icon={FaArrowRight} selected={false} title="Trending Deals" />
//     </div>
//   );
// };

// const Route = ({
//   selected,
//   Icon,
//   title,
// }: {
//   selected: boolean;
//   Icon: IconType;
//   title: string;
// }) => {
//   return (
//     <button
//       className={`flex items-center justify-start gap-2 w-full rounded px-2 py-1.5 text-sm transition-[box-shadow,background-color,color] £{
//         selected
//           ? "bg-white shadow"
//           : "hover:bg-stone-200 bg-transparent text-stone-500 shadow-none"
//       }`}
//     >
//       <Icon className={selected ? "text-violet-500" : ""} />
//       <span>{title}</span>
//     </button>
//   );
// };

// "use client";

// import React from "react";
// import { IconType } from "react-icons";
// import { FaArrowRight } from "react-icons/fa";
// import { usePathname, useRouter } from "next/navigation";

// export const RouteSelect = () => {
//   return (
//     <div className="space-y-1">
//       <Route
//         Icon={FaArrowRight}
//         title="Dashboard"
//         path="/Admin"
//       />

//       <Route
//         Icon={FaArrowRight}
//         title="Destinations"
//         path="/Admin/destinations"
//       />

//       <Route
//         Icon={FaArrowRight}
//         title="Locations"
//         path="/Admin/locations"
//       />

//       <Route
//         Icon={FaArrowRight}
//         title="Holiday"
//         path="/Admin/holiday"
//       />

//       <Route
//         Icon={FaArrowRight}
//         title="Trending Deals"
//         path="/Admin/trending-deals"
//       />
//     </div>
//   );
// };

// const Route = ({
//   title,
//   Icon,
//   path,
// }: {
//   title: string;
//   Icon: IconType;
//   path: string;
// }) => {
//   const pathname = usePathname();
//   const router = useRouter();

//   const selected = pathname === path;

//   return (
//     <button
//       onClick={() => router.push(path)}
//       className={`flex items-center justify-start gap-2 w-full rounded px-2 py-1.5 text-sm transition-colors ${
//         selected
//           ? "bg-white shadow text-stone-950"
//           : "hover:bg-stone-200 bg-transparent text-stone-500"
//       }`}
//     >
//       <Icon className={selected ? "text-violet-500" : ""} />

//       <span>{title}</span>
//     </button>
//   );
// };
"use client";

import React from "react";
import { IconType } from "react-icons";
import { FaArrowRight } from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";

const routes = [
  {
    title: "Dashboard",
    slug: "dashboard",
  },
  {
    title: "Destinations",
    slug: "destinations",
  },
  {
    title: "Locations",
    slug: "locations",
  },
  {
    title: "Holiday",
    slug: "holiday",
  },
  {
    title: "Trending Deals",
    slug: "trending-deals",
  },
];

export const RouteSelect = () => {
  return (
    <div className="space-y-1">
      {routes.map((route) => (
        <Route
          key={route.slug}
          title={route.title}
          slug={route.slug}
          Icon={FaArrowRight}
        />
      ))}
    </div>
  );
};

const Route = ({
  title,
  slug,
  Icon,
}: {
  title: string;
  slug: string;
  Icon: IconType;
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const path = `/Admin/${slug}`;

  const selected = pathname === path;

  return (
    <button
      type="button"
      onClick={() => router.push(path)}
      className={`flex w-full items-center justify-start gap-2 rounded px-2 py-1.5 text-sm transition-colors ${
        selected
          ? "bg-white text-black shadow"
          : "bg-transparent text-neutral-300 hover:bg-neutral-500"
      }`}
    >
      <Icon className={selected ? "text-violet-500" : ""} />

      <span>{title}</span>
    </button>
  );
};
