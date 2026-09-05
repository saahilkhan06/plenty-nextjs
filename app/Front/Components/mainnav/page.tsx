"use client";
import {
  Moon,
  BedDouble,
  CalendarDays,
  Clock,
  Hotel,
  MapPin,
  PlaneTakeoff,
  ShieldCheck,
  Umbrella,
  Wallet,
  Phone,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import { useEffect, useState } from "react";

import Image from "next/image";
import Navbar from "../ui/Navbar";

export default function Mainnav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="border-b bg-white">
        <div className="mx-auto flex max-w-\[1400px\] flex-wrap items-center justify-between gap-4 px-5 py-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Image
              src="/assets/img/plenty-logo-2.png"
              alt="Plenty Holidays Logo"
              width={300}
              height={50}
              // className="h-auto" // ✅ width scales automatically
            />
          </div>

          {/* Right cluster */}
          <div className="flex flex-1 items-center justify-between gap-6 lg:flex-none lg:gap-10">
            <div className="flex items-center  gap-2">
              <img
                src="/assets/img/ATOL.png"
                alt="ATOL Protected"
                className="h-12"
              />
              <span className="hidden lg:flex flex-col text-[13px] leading-tight">
                <strong className="text-xl">ATOL</strong>
                protected
              </span>
            </div>

            <div className="flex items-center gap-2">
              <img
                src="/assets/img/tta.png"
                alt="Travel Trust Association"
                className="h-12"
              />
              <span className="hidden lg:flex flex-col text-[13px] leading-tight">
                <strong className="text-xl">
                  Travel Trust <br />
                  <small>Association</small>
                </strong>
              </span>
            </div>

            <a
              href="tel:02039947646"
              className="flex items-center gap-2 rounded-2xl bg-blue-900 px-5 py-2.5 font-bold text-white"
            >
              <Phone size={18} />
              <span className="hidden flex-col text-left lg:flex">
                <span className="text-2xl font-bold leading-none">
                  0203 994 7646
                </span>
                <small className="text-[13px] font-medium">
                  Everyday <span className="font-bold text-lg">8 am</span> to{" "}
                  <span className="font-bold text-lg">11 pm</span>
                </small>
              </span>
            </a>

            <button
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle menu"
              className="text-3xl lg:hidden"
            >
              {menuOpen ? <X size={30} /> : <Menu size={30} />}
            </button>
          </div>
        </div>

        {/* Main nav */}
        <nav
          className={`${
            menuOpen ? "block" : "hidden"
          } border-t border-gray-100 lg:block lg:border-t-0`}
        >
          {/* <ul className="flex flex-col items-center gap-4 py-4 font-bold lg:flex-row lg:flex-wrap lg:justify-center lg:gap-10">
            {NAV_LINKS.map((link) => (
              <li key={link}>
                <a href="#" className="group flex items-center gap-1 ">
                  <span className="relative animated-underline">
                    {link}
                    <span className="absolute -bottom-1 left-0 h-\[2px\] w-0 bg-current transition-all duration-300 group-hover:w-full" />
                  </span>
                  <ChevronDown size={14} />
                </a>
              </li>
            ))}
          </ul>
          <ul className="flex flex-col items-center gap-4 py-4 font-bold lg:flex-row lg:flex-wrap lg:justify-center lg:gap-10">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a href="#" className="group flex items-center gap-1">
                  <span className="relative animated-underline">
                    {link.label}
                    <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-current transition-all duration-300 group-hover:w-full" />
                  </span>
                  {link.hasDropdown && <ChevronDown size={14} />}
                </a>
              </li>
            ))}
          </ul> */}
          <Navbar />
        </nav>
      </div>
    </>
  );
}
