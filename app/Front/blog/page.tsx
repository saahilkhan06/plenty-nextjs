import Image from "next/image";
import Headnav from "../Components/Headnav/Headnav";
import HolidayCard from "../Components/multicard/HolidayCard";

export default function Blog() {
  return (
    <>
      <Headnav />

      <div className="relative w-full h-120">
        <Image
          src="/assets/img/blog-1.jpg"
          alt="Paris"
          fill
          className="object-cover -z-10"
          priority
        />

        {/* your content sits on top */}
        <div className="relative  z-10 flex h-full flex-col p-20 gap-16 text-white">
          <h1 className="text-7xl font-bold">Welcome to BLOG</h1>
          <h2 className="text-xl">
            Meet Natasha, she’s an extremely talented writer who creates great
            content. Our team at Plenty holidays have the privilege to work and
            travel with her to many beautiful destinations and have had some
            great experiences.
          </h2>
        </div>
      </div>
      <div className="m-20">
        <div>
          <h1 className="text-3xl font-extrabold mb-5">Featured Blogs</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
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
      </div>
    </>
  );
}
