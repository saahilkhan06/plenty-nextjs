"use client";
// Rename-Item -Path "Front" -NewName "Front_temp"
// Rename-Item -Path "Front_temp" -NewName "front"

import { useEffect, useState } from "react";
import Image from "next/image";
import "./global.css";
import Link from "next/link";

// import Navbar from "./Components/ui/Navbar";
import Headnav from "./Components/Headnav/Headnav";
import { Clock, Hotel, ShieldCheck, Wallet } from "lucide-react";
import MobileFooter from "./Components/mobilefooter";

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
      <Headnav />

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
        <div className="mx-5 grid grid-cols-1 gap-5 md:mx-10 md:grid-cols-2 ">
          {TOP_DEALS.map((d) => (
            <img
              key={d.alt}
              src={d.src}
              alt={d.alt}
              className="h-auto w-auto rounded-[10px] object-cover"
            />
          ))}
        </div>
      </section>

      {/* Feature banner */}
      <section className="mx-auto flex max-w-325 flex-wrap items-center justify-center gap-10 px-6 py-9 text-center sm:px-10 lg:flex-nowrap lg:justify-between lg:px-16 lg:text-left">
        <h1 className="shrink-0 whitespace-nowrap text-[26px] font-extrabold leading-tight tracking-tight text-[#1a1a1a] sm:text-[40px]">
          Travel,
          <br />
          The Plenty Way
        </h1>

        <div className="grid grid-cols-2 gap-8 sm:gap-10 lg:flex lg:flex-nowrap lg:gap-8">
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
          <Link
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
          </Link>
        ))}
      </section>
      <MobileFooter />
    </div>
  );
}
