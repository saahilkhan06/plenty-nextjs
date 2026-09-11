"use client";

import { useEffect, useState } from "react";
import { Phone, Menu, X, ChevronDown, Umbrella, Hotel } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import DestinationSearch from "../search/DestinationSearch";
import DepartureSearch from "../search/DepartureSearch";
import TravelDateSearch from "../search/TravelDateSearch";
import StayingForSearch from "../search/StayingForSearch";
import GuestsSearch from "../search/GuestsSearch";
import Navbar from "../ui/Navbar";

const SLIDES = [
  "/assets/img/20260331180729_ph-1.jpg",
  "/assets/img/20260331180759_pl-banner.png",
  "/assets/img/20260331180830_ph-6.jpg",
  "/assets/img/20260626170102_aesthetic-summer-holidays.jpg",
  "/assets/img/20260630090929_13782.jpg",
];

export default function Headnav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [tab, setTab] = useState<"flight" | "hotel">("flight");
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setSlide((s) => (s + 1) % SLIDES.length),
      3000,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <div className=" text-black bg-white">
      {/* <Header /> */}
      <div className="border-b bg-white">
        <div className="mx-auto flex max-w-\[1400px\] flex-wrap items-center justify-between gap-4 px-5 py-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Link href="/Front">
              <Image
                src="/assets/img/plenty-logo-2.png"
                alt="Plenty Holidays Logo"
                width={300}
                height={50}
                className="ml-10"
              />
            </Link>
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
      {/* Search box */}
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
    </div>
  );
}
