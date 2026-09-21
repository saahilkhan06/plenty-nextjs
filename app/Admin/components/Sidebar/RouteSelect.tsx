"use client";

import React, { useState } from "react";
import { IconType } from "react-icons";

import {
  FaTachometerAlt,
  FaGlobe,
  FaMapMarkerAlt,
  FaUmbrellaBeach,
  FaHotel,
  FaUsers,
  FaGift,
  FaBlog,
  FaTags,
  FaPlaneDeparture,
  FaEnvelope,
  FaFileAlt,
  FaCheckCircle,
  FaClock,
  FaQuestionCircle,
  FaFileContract,
  FaStar,
  FaImage,
  FaBuilding,
  FaInfoCircle,
  FaChevronDown,
} from "react-icons/fa";

import { usePathname, useRouter } from "next/navigation";

// =====================================================
// ROUTES
// =====================================================

const routes = [
  {
    title: "Dashboard",
    slug: "dashboard",
    type: "link" as const,
    Icon: FaTachometerAlt,
  },

  {
    title: "Destinations",
    slug: "destinations",
    type: "dropdown" as const,
    Icon: FaGlobe,

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
    Icon: FaMapMarkerAlt,
  },

  {
    title: "Holiday",
    slug: "holiday",
    type: "dropdown" as const,
    Icon: FaUmbrellaBeach,

    children: [
      {
        title: "All Holidays",
        slug: "holiday",
      },
      {
        title: "Deal Search",
        slug: "holiday/deal",
      },
    ],
  },

  {
    title: "Trending Hotel",
    slug: "trending-hotels",
    type: "dropdown" as const,
    Icon: FaHotel,

    children: [
      {
        title: "Trending hotel",
        slug: "trendinghotel",
      },
      {
        title: "Category",
        slug: "trendinghotel/category",
      },
    ],
  },

  {
    title: "Users",
    slug: "users",
    type: "link" as const,
    Icon: FaUsers,
  },

  {
    title: "Hotel Offers",
    slug: "hotel-offer",
    type: "link" as const,
    Icon: FaGift,
  },

  {
    title: "Blogs",
    slug: "blogs",
    type: "link" as const,
    Icon: FaBlog,
  },

  {
    title: "Hotel Deals",
    slug: "hotel-deals",
    type: "link" as const,
    Icon: FaTags,
  },

  {
    title: "Holiday Center",
    slug: "holiday-center",
    type: "link" as const,
    Icon: FaUmbrellaBeach,
  },

  {
    title: "Holiday Center Enquiry",
    slug: "holiday-enquiry",
    type: "link" as const,
    Icon: FaEnvelope,
  },

  {
    title: "Nile Cruise",
    slug: "nile-cruise",
    type: "link" as const,
    Icon: FaPlaneDeparture,
  },

  {
    title: "Nile Cruise Enquiry",
    slug: "nile-enquiry",
    type: "link" as const,
    Icon: FaEnvelope,
  },

  {
    title: "Web pages",
    slug: "webpages",
    type: "link" as const,
    Icon: FaFileAlt,
  },

  {
    title: "Booking Success",
    slug: "booking-success",
    type: "link" as const,
    Icon: FaCheckCircle,
  },

  {
    title: "Booking Pending",
    slug: "booking-pending",
    type: "link" as const,
    Icon: FaClock,
  },

  {
    title: "Manage FAQs",
    slug: "faqs",
    type: "link" as const,
    Icon: FaQuestionCircle,
  },

  {
    title: "Terms Conditions",
    slug: "terms-condition",
    type: "link" as const,
    Icon: FaFileContract,
  },

  {
    title: "Customer Reviews",
    slug: "customer-reviews",
    type: "link" as const,
    Icon: FaStar,
  },

  {
    title: "Banner Big",
    slug: "banner",
    type: "link" as const,
    Icon: FaImage,
  },

  {
    title: "Hotels",
    slug: "hotels",
    type: "link" as const,
    Icon: FaBuilding,
  },

  {
    title: "About Us",
    slug: "about",
    type: "link" as const,
    Icon: FaInfoCircle,
  },
];

// =====================================================
// TYPES
// =====================================================

type RouteSelectProps = {
  sidebarOpen: boolean;
};

type RouteProps = {
  title: string;
  slug: string;
  type: "link" | "dropdown";
  Icon: IconType;

  children?: {
    title: string;
    slug: string;
  }[];

  sidebarOpen: boolean;
};

// =====================================================
// ROUTE SELECT
// =====================================================

export const RouteSelect = ({ sidebarOpen }: RouteSelectProps) => {
  return (
    <div className="mb-10 space-y-2 overflow-visible">
      {routes.map((route) => (
        <Route
          key={route.slug}
          title={route.title}
          slug={route.slug}
          type={route.type}
          Icon={route.Icon}
          children={route.children}
          sidebarOpen={sidebarOpen}
        />
      ))}
    </div>
  );
};

// =====================================================
// ROUTE
// =====================================================

const Route = ({
  title,
  slug,
  type,
  Icon,
  children,
  sidebarOpen,
}: RouteProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const [open, setOpen] = useState(false);

  // Collapsed flyout state
  const [hovered, setHovered] = useState(false);

  // Position of flyout
  const [flyoutPosition, setFlyoutPosition] = useState({
    top: 0,
    left: 0,
  });

  // Used to delay closing slightly so mouse can move
  // from icon to submenu without it disappearing.
  const [closeTimer, setCloseTimer] =
    useState<ReturnType<typeof setTimeout> | null>(null);

  const path = `/Admin/${slug}`;

  const selected = pathname === path;

  // ===================================================
  // NORMAL LINK
  // ===================================================

  if (type === "link") {
    return (
      <button
        type="button"
        onClick={() => router.push(path)}
        title={!sidebarOpen ? title : undefined}
        className={`
          flex
          w-full
          items-center
          rounded
          px-2
          py-2
          text-sm
          transition-colors
          ${
            selected
              ? "bg-white text-black shadow"
              : "text-neutral-300 hover:bg-neutral-700"
          }
          ${sidebarOpen ? "justify-start" : "justify-center"}
        `}
      >
        <Icon className="min-w-[20px] text-lg" />

        {sidebarOpen && (
          <span className="ml-3 whitespace-nowrap">{title}</span>
        )}
      </button>
    );
  }

  // ===================================================
  // COLLAPSED SIDEBAR DROPDOWN
  // ===================================================

  if (!sidebarOpen) {
    const showFlyout = () => {
      if (closeTimer) {
        clearTimeout(closeTimer);
      }

      const element = document.getElementById(
        `sidebar-route-${slug}`
      );

      if (element) {
        const rect = element.getBoundingClientRect();

        setFlyoutPosition({
          top: rect.top,
          left: rect.right + 8,
        });
      }

      setHovered(true);
    };

    const hideFlyout = () => {
      const timer = setTimeout(() => {
        setHovered(false);
      }, 150);

      setCloseTimer(timer);
    };

    return (
      <>
        {/* COLLAPSED ICON */}
        <div
          id={`sidebar-route-${slug}`}
          className="relative"
          onMouseEnter={showFlyout}
          onMouseLeave={hideFlyout}
        >
          <button
            type="button"
            title={title}
            className={`
              flex
              h-10
              
              w-full
              items-center
              justify-center
              rounded
              text-neutral-300
              transition-colors
              hover:bg-neutral-700
              hover:text-white
              ${hovered ? "bg-neutral-700 text-white" : ""}
            `}
          >
            <Icon className="text-lg " />
          </button>
        </div>

        {/* COLLAPSED FLYOUT */}
        {hovered && children && children.length > 0 && (
          <div
            className="
              fixed
              z-[99999]
              w-60
              rounded-lg
              border
              border-slate-700
              bg-slate-900
              p-2
              shadow-2xl
            "
            style={{
              top: flyoutPosition.top,
              left: flyoutPosition.left,
            }}
            onMouseEnter={() => {
              if (closeTimer) {
                clearTimeout(closeTimer);
              }

              setHovered(true);
            }}
            onMouseLeave={hideFlyout}
          >
            {/* PARENT TITLE */}
            <div className="border-b border-slate-700 px-3 py-2 text-sm font-semibold text-white">
              {title}
            </div>

            {/* CHILDREN */}
            <div className="mt-1 space-y-1">
              {children.map((child) => {
                const childPath = `/Admin/${child.slug}`;
                const childSelected = pathname === childPath;

                return (
                  <button
                    key={child.slug}
                    type="button"
                    onClick={() => router.push(childPath)}
                    className={`
                      block
                      w-full
                      rounded-md
                      px-3
                      py-2
                      text-left
                      text-sm
                      transition-colors
                      ${
                        childSelected
                          ? "bg-white text-black"
                          : "text-slate-300 hover:bg-slate-700 hover:text-white"
                      }
                    `}
                  >
                    {child.title}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </>
    );
  }

  // ===================================================
  // EXPANDED SIDEBAR DROPDOWN
  // ===================================================

  return (
    <div>
      {/* DROPDOWN BUTTON */}

      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`
          flex
          w-full
          items-center
          justify-between
          rounded
          px-2
          py-2
          text-sm
          transition-colors
          ${
            open
              ? "bg-neutral-700 text-white"
              : "text-neutral-300 hover:bg-neutral-700"
          }
        `}
      >
        <div className="flex items-center">
          <Icon className="min-w-[20px] text-lg" />

          <span className="ml-3 whitespace-nowrap">{title}</span>
        </div>

        <FaChevronDown
          className={`
            text-xs
            transition-transform
            duration-200
            ${open ? "rotate-180" : ""}
          `}
        />
      </button>

      {/* CHILDREN */}

      {open && children && (
        <div
          className="
            ml-7
            mt-1
            space-y-1
            border-l
            border-neutral-600
            pl-2
          "
        >
          {children.map((child) => {
            const childPath = `/Admin/${child.slug}`;
            const childSelected = pathname === childPath;

            return (
              <button
                key={child.slug}
                type="button"
                onClick={() => router.push(childPath)}
                className={`
                  flex
                  w-full
                  rounded
                  px-2
                  py-1.5
                  text-left
                  text-sm
                  whitespace-nowrap
                  transition-colors
                  ${
                    childSelected
                      ? "bg-white text-black shadow"
                      : "text-neutral-400 hover:bg-neutral-700 hover:text-white"
                  }
                `}
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