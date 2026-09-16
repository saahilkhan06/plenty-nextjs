// components/Nav.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { NAV_LINKS } from "../../data/navLinks";

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
      <ul className="flex flex-col mx-3 gap-4 py-4 font-bold lg:flex-row lg:flex-wrap lg:justify-center lg:gap-10">
        {NAV_LINKS.map((link) => {
          const isOpen = openMenu === link.label;

          return (
            <li key={link.label} className="relative cursor-pointer">
              {link.hasDropdown ? (
                <button
                  type="button"
                  onClick={() => {
                    toggleMenu(link.label);

                    const nestedCol = link.dropdownColumns?.find(
                      (c) => c.type === "nested",
                    );

                    if (nestedCol?.type === "nested") {
                      setActiveCountry(nestedCol.items[0]?.label ?? null);
                    }
                  }}
                  className="group flex w-full items-center justify-between"
                >
                  <span className="relative animated-underline cursor-pointer">
                    {link.label}
                  </span>

                  <ChevronDown
                    size={24}
                    className={`ml-1 cursor-pointer transition-transform duration-300 ${
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

              {/* DROPDOWN FOR THIS MENU */}
              {isOpen && link.dropdownColumns && (
                <div
                  className="
                absolute
                left-1/2
                top-full
                z-50
                mt-2
                w-[95vw]
                -translate-x-1/2
                max-h-[70vh]
                overflow-y-auto
                rounded-2xl
                bg-white
                py-6
                shadow-xl

                sm:w-[90vw]
                sm:py-8

                lg:w-[80vw]
                lg:max-w-[1200px]
              "
                >
                  <div className="mx-auto max-w-[1400px] px-4 sm:px-5">
                    <div
                      className={
                        link.dropdownColumns.every((c) => c.type === "flat")
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

                        // Nested column
                        const active = col.items.find(
                          (c) => c.label === activeCountry,
                        );

                        const isLastNested =
                          colIdx === link.dropdownColumns!.length - 1;

                        return (
                          <div
                            key={col.title}
                            className={`flex flex-col gap-4 sm:w-auto sm:flex-row sm:shrink-0 sm:gap-10 ${
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

                            {/* Cities */}
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
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
