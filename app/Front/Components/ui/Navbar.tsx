// components/Nav.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { NAV_LINKS } from "../../data/navLinks";
import DropdownActions from "./DropdownActions";

export default function Nav() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [activeCountry, setActiveCountry] = useState<string | null>(null);

  const navRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close dropdown on scroll
  useEffect(() => {
    function handleScroll() {
      setOpenMenu(null);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function toggleMenu(label: string) {
    setOpenMenu((prev) => (prev === label ? null : label));
  }

  return (
    <div ref={navRef} className="relative">
      {/* Main navigation */}
      <ul className="flex flex-col  items-center gap-4 py-4 font-bold lg:flex-row lg:flex-wrap lg:justify-center lg:gap-10">
        {NAV_LINKS.map((link) => {
          const isOpen = openMenu === link.label;

          return (
            <li key={link.label} className="cursor-pointer">
              {link.hasDropdown ? (
                <button
                  type="button"
                  onClick={() => {
                    toggleMenu(link.label);

                    // Set first nested item as active
                    const nestedCol = link.dropdownColumns?.find(
                      (c) => c.type === "nested",
                    );

                    if (nestedCol && nestedCol.type === "nested") {
                      setActiveCountry(nestedCol.items[0]?.label ?? null);
                    }
                  }}
                  className="group flex items-center gap-1"
                >
                  <span className="relative animated-underline cursor-pointer">
                    {link.label}
                  </span>

                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-300 cursor-pointer ${
                      isOpen ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </button>
              ) : (
                <a href={link.href} className="group flex items-center gap-1">
                  <span className="relative animated-underline">
                    {link.label}
                  </span>
                </a>
              )}
            </li>
          );
        })}
      </ul>

      {/* Dropdown panels */}
      {NAV_LINKS.filter((l) => l.hasDropdown).map((link) => {
        if (openMenu !== link.label || !link.dropdownColumns) {
          return null;
        }

        const allFlat = link.dropdownColumns.every((c) => c.type === "flat");

        return (
          <div
            key={link.label}
            className="absolute inset-x-4 top-full z-50 max-h-[70vh] overflow-y-auto rounded-b-2xl bg-white py-6 shadow-xl sm:inset-x-8 sm:py-8 lg:inset-x-16 lg:rounded-b-4xl"
          >
            <div className="mx-auto max-w-350 px-4 sm:px-5">
              <div
                className={
                  allFlat
                    ? "grid grid-cols-2 gap-8 sm:grid-cols-4 sm:gap-x-12"
                    : "flex flex-col gap-8 sm:flex-row sm:gap-10"
                }
              >
                {link.dropdownColumns.map((col, colIdx) => {
                  if (col.type === "flat") {
                    const isLarge = col.items.length > 10;

                    return (
                      <div
                        key={col.title}
                        className={
                          isLarge
                            ? "w-full sm:min-w-0 sm:flex-1"
                            : "w-full sm:w-56 sm:shrink-0"
                        }
                      >
                        <h3 className="mb-3 border-b pb-2 font-bold uppercase text-blue-900">
                          {col.title}
                        </h3>

                        <ul
                          className={
                            isLarge
                              ? "max-h-60 columns-2 gap-x-8 overflow-y-auto pr-2 sm:max-h-105 sm:columns-3"
                              : "space-y-3"
                          }
                        >
                          {col.items.map((item) => (
                            <li
                              key={item.label}
                              className={
                                isLarge ? "mb-3 break-inside-avoid" : ""
                              }
                            >
                              <a
                                href={item.href}
                                className="font-semibold text-gray-800 hover:text-blue-600"
                              >
                                {item.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  }

                  // Nested column (Popular Destinations)
                  const active = col.items.find(
                    (c) => c.label === activeCountry,
                  );

                  const isLastNested =
                    colIdx === link.dropdownColumns!.length - 1;

                  return (
                    <div
                      key={col.title}
                      className={`flex flex-col gap-4 sm:w-auto sm:flex-row sm:gap-10 sm:shrink-0 ${
                        !isLastNested ? "sm:border-r sm:pr-16" : ""
                      }`}
                    >
                      {/* Countries */}
                      <div className="w-full sm:min-w-55">
                        <h3 className="mb-3 border-b pb-2 font-bold uppercase text-blue-700">
                          {col.title}
                        </h3>

                        <ul className="max-h-60 space-y-1 overflow-y-auto pr-2 sm:max-h-105">
                          {col.items.map((country) => (
                            <li
                              key={country.label}
                              onMouseEnter={() => {
                                if (country.children) {
                                  setActiveCountry(country.label);
                                }
                              }}
                            >
                              {country.children ? (
                                <button
                                  type="button"
                                  onClick={() =>
                                    setActiveCountry(country.label)
                                  }
                                  className={`flex w-full items-center justify-between py-1 text-left ${
                                    activeCountry === country.label
                                      ? "font-semibold text-blue-600"
                                      : "text-gray-800 hover:text-blue-600"
                                  }`}
                                >
                                  {country.label}
                                  <ChevronRight size={14} />
                                </button>
                              ) : (
                                <a
                                  href={country.href}
                                  className="block py-1 text-gray-800 hover:text-blue-600"
                                >
                                  {country.label}
                                </a>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Cities for active country */}
                      {active?.children && (
                        <div className="w-full sm:min-w-35 sm:pt-9">
                          <ul className="max-h-60 space-y-1 overflow-y-auto sm:max-h-105">
                            {active.children.map((city) => (
                              <li key={city.label}>
                                <a
                                  href={city.href}
                                  className="block py-1 font-semibold text-gray-800 hover:text-blue-600"
                                >
                                  {city.label}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <DropdownActions
              onClear={() => setActiveCountry(null)}
              onDone={() => setOpenMenu(null)}
            />
          </div>
        );
      })}
    </div>
  );
}
