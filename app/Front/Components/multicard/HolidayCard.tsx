"use client";

import Image from "next/image";
import { FaMapMarkerAlt, FaHotel } from "react-icons/fa";

interface Hotel {
  name: string;
  rating: number;
}

interface HolidayCardProps {
  image: string;
  title: string;
  location: string;
  duration: string;
  hotels: Hotel[];
  price: number;
}

export default function HolidayCard({
  image,
  title,
  location,
  duration,
  hotels,
  price,
}: HolidayCardProps) {
  return (
    <div className="w-87.5 overflow-hidden rounded-3xl bg-white shadow-lg">
      {/* IMAGE */}
      <div className="relative h-50 w-full">
        <Image src={image} alt={title} fill className="object-cover" />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/10" />

        {/* Duration */}
        <div className="absolute bottom-8 right-0 rounded-l-lg bg-blue-600 px-4 py-2 text-lg font-bold text-white">
          {duration}
        </div>
      </div>

      {/* BLUE TITLE SECTION */}
      <div className="bg-[#063b7d] px-5 py-2 text-white">
        <h2 className="truncate text-xl font-bold">{title}</h2>

        {/* Location */}
        <div className="mt-3 inline-flex items-center gap-1 rounded-full bg-white px-3  text-sm font-semibold text-black">
          <FaMapMarkerAlt className="text-blue-600" />
          {location}
        </div>
      </div>

      {/* HOTEL SECTION */}
      <div className="min-h-30 bg-gray-50 px-6 py-3">
        <div className="space-y-2">
          {hotels.map((hotel, index) => (
            <div key={index} className="flex items-center gap-2 text-base">
              <FaHotel className="text-blue-700" />

              <span>{hotel.name}</span>

              <span className="rounded-full bg-blue-500 px-3 py-1 text-sm font-semibold text-white">
                {hotel.rating} ⭐
              </span>
            </div>
          ))}
        </div>
      </div>
      {/* BOTTOM SECTION */}
      <div className="flex items-center justify-between bg-gray-50 px-6 pb-3">
        <div>
          <span className="text-3xl font-bold text-gray-900">£{price}</span>
          <span className="ml-1 text-lg font-semibold">pp</span>
        </div>

        <button className="rounded-lg bg-yellow-400 px-8 py-3 text-lg font-bold text-black transition hover:bg-yellow-500">
          View Deal
        </button>
      </div>
    </div>
  );
}
