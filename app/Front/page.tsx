"use client";

import { useEffect, useState } from "react";
import { Phone, Menu, X, ChevronDown } from "lucide-react";
import Image from "next/image";
import "./global.css";
import DestinationSearch from "./Components/search/DestinationSearch";
import DepartureSearch from "./Components/search/DepartureSearch";
import TravelDateSearch from "./Components/search/TravelDateSearch";
import StayingForSearch from "./Components/search/StayingForSearch";
import GuestsSearch from "./Components/search/GuestsSearch";

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
} from "lucide-react";
// import Header from "/Components/Header";
// import Footer from "/Components/Footer";

const SLIDES = [
  "/assets/img/20260331180729_ph-1.jpg",
  "/assets/img/20260331180759_pl-banner.png",
  "/assets/img/20260331180830_ph-6.jpg",
  "/assets/img/20260626170102_aesthetic-summer-holidays.jpg",
  "/assets/img/20260630090929_13782.jpg",
];

const TOP_DEALS = [
  {
    src: "/assets/img/1786607694_canary-islands-6.jpg",
    alt: "Canary Islands",
  },
  { src: "/assets/img/1786607676_greece-6.jpg", alt: "Greece" },
  {
    src: "/assets/img/1786607707_winter-holidays-1.jpg",
    alt: "Winter Holidays",
  },
  { src: "/assets/img/1786607819_turkey-9.jpg", alt: "Turkey" },
];

const FEATURES = [
  {
    icon: ShieldCheck,
    title: "ATOL Protected",
    desc: "Your money is safe with us",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    desc: "We're here whenever you need us",
  },
  {
    icon: Wallet,
    title: "Price Guarantee",
    desc: "Found cheaper? We'll match it",
  },
  { icon: Hotel, title: "Low Deposits", desc: "Book from just $29pp" },
];

const CATEGORIES = [
  {
    img: "photo-1476673160081-cf065607f449",
    label: "Family Friendly Holidays",
  },
  { img: "photo-1483664852095-d6cc6870702d", label: "Winter Sun Holidays" },
  { img: "photo-1541014741259-de529411b96a", label: "All Inclusive Holidays" },
  { img: "photo-1507525428034-b723cf961d3e", label: "Summer Sun Holidays" },
  { img: "photo-1477959858617-67f85cf4f1df", label: "City Breaks" },
  { img: "photo-1544551763-46a013bb70d5", label: "Cheap Holidays" },
  { img: "photo-1519046904884-53103b34b206", label: "Adults Only" },
  { img: "photo-1540541338287-41700207dee6", label: "Affordable Luxury" },
  { img: "photo-1519046904884-53103b34b206", label: "Beach Holidays" },
  { img: "photo-1500375592092-40eb2168fd21", label: "Honeymoon Holidays" },
  { img: "photo-1488646953014-85cb44e25828", label: "Last Minute Deals" },
  { img: "photo-1520250497591-112f2f40a3f4", label: "Romantic Escapes" },
  { img: "photo-1522383225653-ed111181a951", label: "Spring Breaks" },
  { img: "photo-1519046904884-53103b34b206", label: "Couple Holidays" },
  { img: "photo-1512389142860-9c449e58a543", label: "Christmas Market" },
];
// const NAV_LINKS = [
//   "Holidays",
//   "Destinations",
//   "Nile Cruise",
//   "Multi Centre Holidays",
//   "Blog",
//   "Help",
// ];

const NAV_LINKS = [
  { label: "Holidays", hasDropdown: true },
  { label: "Destinations", hasDropdown: true },
  { label: "Nile Cruise", hasDropdown: true },
  { label: "Multi Centre Holidays", hasDropdown: true },
  { label: "Blog", hasDropdown: false },
  { label: "Help", hasDropdown: false },
];

export default function HomePage() {
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
    <div className="min-h-screen text-black bg-white">
      {/* <Header /> */}
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
          </ul> */}
          <ul className="flex flex-col items-center gap-4 py-4 font-bold lg:flex-row lg:flex-wrap lg:justify-center lg:gap-10">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a href="#" className="group flex items-center gap-1">
                  <span className="relative animated-underline">
                    {link.label}
                    {/* <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-current transition-all duration-300 group-hover:w-full" /> */}
                  </span>
                  {link.hasDropdown && <ChevronDown size={14} />}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      {/* Search box */}
      <section className="w-full bg-blue-950 bg-cover bg-center px-5 py-8 text-white sm:px-8">
        <div className="mb-10 flex flex-wrap gap-8">
          <button
            onClick={() => setTab("flight")}
            className={`flex cursor-pointer  items-center gap-2.5 text-xl font-semibold ${
              tab === "flight"
            }`}
          >
            <Umbrella size={24} />
            <span className="animated-underline">Flight + Hotel</span>
          </button>
          <button
            onClick={() => setTab("hotel")}
            className={`flex cursor-pointer items-center gap-2.5 text-xl font-semibold ${
              tab === "hotel" ? "underline" : ""
            }`}
          >
            <Hotel size={24} />
            <span className="animated-underline">Hotel Only</span>
          </button>
        </div>

        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:gap-3">
          <DestinationSearch />

          <div className="flex gap-4 lg:contents">
            <DepartureSearch />
            <StayingForSearch />
          </div>

          <TravelDateSearch />
          <GuestsSearch />

          <button className="h-14 w-full rounded-[20px] bg-[#2171C9] font-bold text-white transition-colors hover:bg-[#3A8DE4] lg:w-auto lg:shrink-0 lg:px-8">
            Search
          </button>
        </div>
      </section>

      {/* Banner slider */}
      <section className="relative mb-8 w-full overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${slide * 100}%)` }}
        >
          {SLIDES.map((src) => (
            <div key={src} className="min-w-full">
              <img
                src={src}
                alt=""
                className="h-80 w-full object-cover md:h-127.5"
              />
            </div>
          ))}
        </div>
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2 w-2 rounded-full ${slide === i ? "bg-white" : "bg-white/50"}`}
            />
          ))}
        </div>
      </section>

      {/* Top deals */}
      <section>
        <div className="mb-6 flex flex-col items-center gap-2.5 px-5 text-center">
          <h2 className="text-blue-600 text-2xl font-bold">TOP DEALS</h2>
          <h1 className="text-[30px] font-bold text-black md:text-[40px]">
            Trending Destinations
          </h1>
        </div>
        <div className="mx-5 grid grid-cols-1 gap-5 md:mx-10 md:grid-cols-2">
          {TOP_DEALS.map((d) => (
            <img
              key={d.alt}
              src={d.src}
              alt={d.alt}
              className="h-60 w-full rounded-[10px] object-cover"
            />
          ))}
        </div>
      </section>

      {/* Feature banner */}
      <section className="mx-auto flex max-w-325 flex-wrap items-center justify-center gap-10 px-6 py-9 text-center lg:justify-between lg:text-left">
        <h1 className="whitespace-nowrap text-[26px] font-extrabold leading-tight tracking-tight text-[#1a1a1a] sm:text-[40px]">
          Travel,
          <br />
          The Plenty Way
        </h1>

        <div className="grid grid-cols-2 gap-8 sm:gap-10 lg:flex lg:flex-wrap lg:gap-12">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="flex max-w-47.5 flex-col items-center justify-center"
            >
              <div className="mb-3.5 flex h-12 w-12 items-center justify-center rounded-full bg-[#10254e]">
                <Icon size={22} className="text-white" strokeWidth={1.8} />
              </div>
              <h3 className="mb-1 text-base font-bold text-[#1a1a1a]">
                {title}
              </h3>
              <p className="text-sm leading-snug text-gray-600">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <div className="flex flex-col items-center gap-2.5 px-5 text-center">
        <h2 className="text-blue-500 text-2xl font-bold">Look Beyond</h2>
        <h1 className="text-[30px] font-bold text-black md:text-[40px]">
          Many perspectives, one world
        </h1>
      </div>
      <section className="mx-auto grid max-w-325 grid-cols-1 gap-4 px-5 py-10 sm:grid-cols-3 ">
        {CATEGORIES.map((c, i) => (
          <a
            key={`${c.label}-${i}`}
            href="#"
            className="overflow-hidden animated-underline rounded-md bg-white shadow-[0_4px_14px_rgba(0,0,0,0.12)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_22px_rgba(0,0,0,0.18)]"
          >
            <Image
              src={`https://images.unsplash.com/${c.img}?w=800&q=80`}
              alt={c.label}
              className="aspect-video w-full object-cover sm:aspect-video"
              width={200}
              height={20}
            />

            <div className="p-4 text-center">
              <span className=" animated-underline text-lg font-bold text-[#10254e] ">
                {c.label}
              </span>
            </div>
          </a>
        ))}
      </section>
    </div>
  );
}

// function SearchField({
//   id,
//   label,
//   icon: Icon,
//   placeholder,
//   widthClass = "w-full sm:w-auto sm:flex-1",
// }: {
//   id: string;
//   label: string;
//   icon: React.ElementType;
//   placeholder: string;
//   widthClass?: string;
// }) {
//   return (
//     <div className={`flex flex-col gap-2.5 ${widthClass}`}>
//       <label htmlFor={id} className="text-lg font-semibold">
//         {label}
//       </label>
//       <div className="relative">
//         <Icon
//           size={18}
//           className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-black"
//         />
//         <input
//           id={id}
//           type="text"
//           placeholder={placeholder}
//           className="w-full cursor-pointer rounded-[5px] border-none bg-white p-3.5 pl-11 text-black outline-none"
//         />
//       </div>
//     </div>
//   );
// }
