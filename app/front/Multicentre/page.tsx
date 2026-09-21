import Headnav from "../Components/Headnav/Headnav";
import Image from "next/image";
import HolidayCard from "../Components/multicard/HolidayCard";
export default function Multicentre() {
  return (
    <>
      <Headnav />

      <div className="relative w-full h-120">
        <Image
          src="/assets/img/multi3.jpg"
          alt="Paris"
          fill
          className="object-cover -z-10 brightness-80"
          priority
        />

        {/* your content sits on top */}
        <div className="relative  z-10 flex h-full flex-col p-20 gap-16 text-white">
          <h1 className="text-7xl font-bold">Multi-Centre Holidays</h1>
          <h2 className="text-xl">
            Our expertly crafted multi-centre holidays let you combine cities,
            beaches, culture, and adventure — all in one seamless itinerary.
          </h2>
        </div>
      </div>
      <div className="flex justify-center items-center mt-10">
        <div className="flex flex-col items-center gap-5">
          <p className="text-2xl font-bold text-blue-700">
            Travel Without Limits
          </p>
          <p className="text-4xl font-bold ">
            Multi-Destination Travel Packages
          </p>
          <div className="flex justify-around w-full  items-center">
            <button className="rounded-full border-2 border-blue-500 px-6 py-1 text-base hover:text-blue-700 cursor-pointer">
              All
            </button>
            <button className="rounded-full border-2 border-blue-500 px-6 py-1 text-base  hover:text-blue-700 cursor-pointer">
              Western Europe
            </button>
            <button className="rounded-full border-2 border-blue-500 px-6 py-1 text-base  hover:text-blue-700 cursor-pointer">
              Asia
            </button>
            <button className="rounded-full border-2 border-blue-500 px-6 py-1 text-base  hover:text-blue-700 cursor-pointer">
              Africa
            </button>
          </div>
        </div>
      </div>
      <div className="grid m-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <HolidayCard
          image="/assets/img/multi1.jpg"
          title="Grand Italy Tour: Venice, Florence & Rome"
          location="Italy"
          duration="9 Nights / 10 Days"
          price={449}
          hotels={[
            {
              name: "Hotel Adria",
              rating: 4,
            },
            {
              name: "Hotel Grifone Firenze",
              rating: 4,
            },
            {
              name: "TH Roma Carpegna Palace",
              rating: 4,
            },
          ]}
        />
        <HolidayCard
          image="/assets/img/multi1.jpg"
          title="Grand Italy Tour: Venice, Florence & Rome"
          location="Italy"
          duration="9 Nights / 10 Days"
          price={449}
          hotels={[
            {
              name: "Hotel Adria",
              rating: 4,
            },
            {
              name: "Hotel Grifone Firenze",
              rating: 4,
            },
            {
              name: "TH Roma Carpegna Palace",
              rating: 4,
            },
          ]}
        />
        <HolidayCard
          image="/assets/img/multi1.jpg"
          title="Grand Italy Tour: Venice, Florence & Rome"
          location="Italy"
          duration="9 Nights / 10 Days"
          price={449}
          hotels={[
            {
              name: "Hotel Adria",
              rating: 4,
            },
            {
              name: "Hotel Grifone Firenze",
              rating: 4,
            },
            {
              name: "TH Roma Carpegna Palace",
              rating: 4,
            },
          ]}
        />
        <HolidayCard
          image="/assets/img/multi1.jpg"
          title="Grand Italy Tour: Venice, Florence & Rome"
          location="Italy"
          duration="9 Nights / 10 Days"
          price={449}
          hotels={[
            {
              name: "Hotel Adria",
              rating: 4,
            },
            {
              name: "Hotel Grifone Firenze",
              rating: 4,
            },
            {
              name: "TH Roma Carpegna Palace",
              rating: 4,
            },
          ]}
        />
        <HolidayCard
          image="/assets/img/multi1.jpg"
          title="Grand Italy Tour: Venice, Florence & Rome"
          location="Italy"
          duration="9 Nights / 10 Days"
          price={449}
          hotels={[
            {
              name: "Hotel Adria",
              rating: 4,
            },
            {
              name: "Hotel Grifone Firenze",
              rating: 4,
            },
            {
              name: "TH Roma Carpegna Palace",
              rating: 4,
            },
          ]}
        />
        <HolidayCard
          image="/assets/img/multi1.jpg"
          title="Grand Italy Tour: Venice, Florence & Rome"
          location="Italy"
          duration="9 Nights / 10 Days"
          price={449}
          hotels={[
            {
              name: "Hotel Adria",
              rating: 4,
            },
            {
              name: "Hotel Grifone Firenze",
              rating: 4,
            },
            {
              name: "TH Roma Carpegna Palace",
              rating: 4,
            },
          ]}
        />
      </div>
    </>
  );
}
