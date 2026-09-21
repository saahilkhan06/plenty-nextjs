import Headnav from "../../Components/Headnav/Headnav";
import { holidays } from "../data";

export default function HolidayPage({
  params,
}: {
  params: { slug: string };
}) {
  const holiday =
    holidays[params.slug as keyof typeof holidays];

  if (!holiday) {
    return (
      <div className="p-10">
        <h1 className="text-2xl font-bold">
          Holiday not found
        </h1>
      </div>
    );
  }

  return (
    <div>
        <Headnav/>
    <div className="px-6 py-10 lg:m-10">
      
      {/* Heading */}
      <h1 className="text-4xl font-bold">
        Destinations Hotels In {holiday.name}
      </h1>

      <p className="mt-6 text-lg text-gray-700">
        Browse Our Wider Selection Of Hotels from Destinations
      </p>

      {/* Hotels */}
      <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        
        {holiday.hotels.map((hotel, index) => (
          <div key={index}>
            
            {/* Hotel Image */}
            <img
              src={hotel.image}
              alt={hotel.name}
              className="h-[180px] w-full rounded-xl object-cover"
            />

            {/* Hotel Name */}
            <h2 className="mt-2 truncate text-lg font-bold">
              {hotel.name}
            </h2>

            {/* Location */}
            <p className="mt-2 text-gray-700">
              {hotel.location}
            </p>

          </div>
        ))}

      </div>

      {/* View all */}
      <div className="mt-8 flex justify-center">
        <button className="rounded-xl border border-blue-700 px-6 py-3 text-lg text-blue-700 hover:bg-blue-700 hover:text-white">
          View all
        </button>
      </div>

    </div>
    </div>
  );
}