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
// "use client";

// import React from "react";
// import { IconType } from "react-icons";
// import { FaArrowRight } from "react-icons/fa";
// import { usePathname, useRouter } from "next/navigation";

// const routes = [
//   {
//     title: "Dashboard",
//     slug: "dashboard",
//   },
//   {
//     title: "Destinations",
//     slug: "destinations",
//   },
//   {
//     title: "Locations",
//     slug: "locations",
//   },
//   {
//     title: "Holiday",
//     slug: "holiday",
//   },
//   {
//     title: "Trending Deals",
//     slug: "trending-deals",
//   },
//   {
//     title: "Trending Deals",
//     slug: "trending-deals",
//   },
// ];

// export const RouteSelect = () => {
//   return (
//     <div className="space-y-1">
//       {routes.map((route) => (
//         <Route
//           key={route.slug}
//           title={route.title}
//           slug={route.slug}
//           Icon={FaArrowRight}
//         />
//       ))}
//     </div>
//   );
// };

// const Route = ({
//   title,
//   slug,
//   Icon,
// }: {
//   title: string;
//   slug: string;
//   Icon: IconType;
// }) => {
//   const router = useRouter();
//   const pathname = usePathname();

//   const path = `/Admin/${slug}`;

//   const selected = pathname === path;

//   return (
//     <button
//       type="button"
//       onClick={() => router.push(path)}
//       className={`flex w-full items-center justify-start gap-2 rounded px-2 py-1.5 text-sm transition-colors ${
//         selected
//           ? "bg-white text-black shadow"
//           : "bg-transparent text-neutral-300 hover:bg-neutral-500"
//       }`}
//     >
//       <Icon className={selected ? "text-violet-500" : ""} />

//       <span>{title}</span>
//     </button>
//   );
// };
"use client";

import React, { useState } from "react";
import { IconType } from "react-icons";
import {
  FaArrowRight,
  FaChevronDown,
} from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";

const routes = [
  {
    title: "Dashboard",
    slug: "dashboard",
    type: "link" as const,
  },

  {
    title: "Destinations",
    slug: "destinations",
    type: "dropdown" as const,
    children: [
      {
        title: "Destination",
        slug: "destinations",
      },
      {
        title: "Sub Destination",
        slug: "destinations/sub",
      },
      {
        title: "Destination Other",
        slug: "destinations/other",
      },
      {
        title: "Destination FAQ",
        slug: "destinations/faq",
      },
      {
        title: "Resorts",
        slug: "destinations/resorts",
      },
    ],
  },

  {
    title: "Locations",
    slug: "locations",
    type: "link" as const,
  },

  {
    title: "Holiday",
    slug: "holiday",
    type: "dropdown" as const,
    children: [
      {
        title: "All Holidays",
        slug: "holiday",
      },
      {
        title: "Deal Search",
        slug: "holiday/add",
      },
    ],
  },

  {
    title: "Trending Hotel",
    slug: "trending-hotels",
    type: "dropdown" as const,
    children: [
      {
        title: "Trending hotel",
        slug: "trendinghotel",
      },
      {
        title: "category",
        slug: "trendinghotel/category",
      },
    ],
  },
  {
    title: "Users",
    slug: "users",
    type: "link" as const,
  },
  {
    title: "Hotel Offers",
    slug: "hotel-offer",
    type: "link" as const,
  },
  {
    title: "Blogs",
    slug: "blogs",
    type: "link" as const,
  },
  {
    title: "Hotel Deals",
    slug: "hotel-deals",
    type: "link" as const,
  },
  {
    title: "Holiday Center",
    slug: "holiday-center",
    type: "link" as const,
  },
  {
    title: "Holiday Center Enquiry",
    slug: "holiday-enquiry",
    type: "link" as const,
  },
  {
    title: "Nile Cruise",
    slug: "nile-cruise",
    type: "link" as const,
  },
  {
    title: "Nile Cruise Enquiry",
    slug: "nile-enquiry",
    type: "link" as const,
  },
  {
    title: "Web pages",
    slug: "webpages",
    type: "link" as const,
  },
  {
    title: "Booking Success",
    slug: "booking-success",
    type: "link" as const,
  },
  {
    title: "Booking Pending",
    slug: "booking-pending",
    type: "link" as const,
  },
  {
    title: "Manage FAQs",
    slug: "faqs",
    type: "link" as const,
  },
  {
    title: "Terms Conditions",
    slug: "terms-condition",
    type: "link" as const,
  },
  {
    title: "Customer Reviews",
    slug: "customer-reviews",
    type: "link" as const,
  },
  {
    title: "Banner Big",
    slug: "banner",
    type: "link" as const,
  },
  {
    title: "Hotels",
    slug: "hotels",
    type: "link" as const,
  },
  {
    title: "About Us",
    slug: "about",
    type: "link" as const,
  },
 
  
];

export const RouteSelect = () => {
  return (
    <div className="space-y-2 mb-10">
      {routes.map((route) => (
        <Route
          key={route.slug}
          title={route.title}
          slug={route.slug}
          type={route.type}
          Icon={FaArrowRight}
          children={route.children}
        />
      ))}
    </div>
  );
};

const Route = ({
  title,
  slug,
  type,
  Icon,
  children,
}: {
  title: string;
  slug: string;
  type: "link" | "dropdown";
  Icon: IconType;
  children?: {
    title: string;
    slug: string;
  }[];
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const [open, setOpen] = useState(false);

  const path = `/Admin/${slug}`;

  const selected = pathname === path;

  // NORMAL ROUTE
  if (type === "link") {
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
  }

  // DROPDOWN ROUTE
  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`flex w-full items-center justify-between rounded px-2 py-1.5 text-sm transition-colors ${
          open
            ? "bg-neutral-500 text-white"
            : "bg-transparent text-neutral-300 hover:bg-neutral-500"
        }`}
      >
        <div className="flex items-center gap-2">
          <Icon />

          <span>{title}</span>
        </div>

        <FaChevronDown
          className={`text-xs transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* DROPDOWN CHILDREN */}
      {open && children && (
        <div className="ml-6 mt-1 space-y-1 border-l border-neutral-500 pl-2">
          {children.map((child) => {
            const childPath = `/Admin/${child.slug}`;
            const childSelected = pathname === childPath;

            return (
              <button
                key={child.slug}
                type="button"
                onClick={() => router.push(childPath)}
                className={`flex w-full items-center rounded px-2 py-1.5 text-left text-sm transition-colors ${
                  childSelected
                    ? "bg-white text-black shadow"
                    : "text-neutral-400 hover:bg-neutral-500 hover:text-white"
                }`}
              >
                {child.title}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
