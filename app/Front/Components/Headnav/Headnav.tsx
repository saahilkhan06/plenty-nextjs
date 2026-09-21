"use client";

import { useEffect, useState } from "react";
import { Phone, Menu, X, Umbrella, Hotel } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import DestinationSearch from "../search/DestinationSearch";
import DepartureSearch from "../search/DepartureSearch";
import TravelDateSearch from "../search/TravelDateSearch";
import StayingForSearch from "../search/StayingForSearch";
import GuestsSearch from "../search/GuestsSearch";
import Navbar from "../ui/Navbar";
import VoiceSearch from "../../fronttest/voice";

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
        {/* Header */}
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-2 px-3 py-2 sm:gap-4 sm:px-5 sm:py-3 lg:gap-6 lg:py-4">
          {/* Logo */}
          <div className="flex shrink-0 items-center">
            <Link href="/front">
              <Image
                src="/assets/img/plenty-logo-2.png"
                alt="Plenty Holidays Logo"
                width={300}
                height={50}
                priority
                className="
            h-auto
            w-[160px]
            sm:w-[190px]
            lg:w-[300px]
            lg:ml-10
          "
              />
            </Link>
          </div>

          {/* Right cluster */}
          <div className="flex min-w-0 items-center gap-3 sm:gap-4 lg:gap-8">
            {/* ATOL */}
            <div className="flex shrink-0 items-center gap-2">
              <Image
                src="/assets/img/ATOL.png"
                alt="ATOL Protected"
                width={56}
                height={56}
                className="h-12  w-auto sm:h-10 lg:h-12"
              />

              <span className="hidden lg:flex flex-col text-[13px] leading-tight">
                <strong className="text-xl">ATOL</strong>
                <span>protected</span>
              </span>
            </div>

            {/* TTA */}
            <div className="flex shrink-0 items-center gap-2">
              <Image
                src="/assets/img/tta.png"
                alt="Travel Trust Association"
                width={96}
                height={61}
                className="h-12 w-auto sm:h-10 lg:h-12"
              />

              <span className="hidden lg:flex flex-col text-[13px] leading-tight">
                <strong className="text-xl">
                  Travel Trust
                  <br />
                  <small>Association</small>
                </strong>
              </span>
            </div>

            {/* Phone */}
            <Link
              href="tel:02039947646"
              aria-label="Call Plenty Holidays"
              className="
          hidden
    md:flex
    shrink-0
    items-center
    justify-center
    rounded-xl
    bg-blue-900
    p-2.5
    text-white
    sm:px-4
    sm:py-2.5
        "
            >
              <Phone size={18} />

              {/* Desktop phone information */}
              <span className="hidden lg:flex flex-col text-left ml-2">
                <span className="text-2xl font-bold leading-none">
                  0203 994 7646
                </span>

                <small className="text-[13px] font-medium">
                  Everyday <span className="text-lg font-bold">8 am</span> to{" "}
                  <span className="text-lg font-bold">11 pm</span>
                </small>
              </span>
            </Link>

            {/* Mobile menu */}
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className="
          flex
          shrink-0
          items-center
          justify-center
          p-1
          text-gray-800
          lg:hidden
        "
            >
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Main Navigation */}
        <nav
          className={`
      ${menuOpen ? "block" : "hidden"}
      border-t
      border-gray-100
      lg:block
      lg:border-t-0
    `}
        >
          <Navbar />
        </nav>
      </div>
      {/* Search box */}
      <section className="w-full bg-blue-950 bg-cover bg-center px-5 py-4 lg:py-8 text-white sm:px-8">
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

        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:gap-3">
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
