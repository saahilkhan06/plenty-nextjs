import { destinations } from "../data";
import Headnav from "../../Components/Headnav/Headnav";

export default function DestinationPage({
  params,
}: {
  params: { slug: string };
}) {
  const destination = destinations[params.slug as keyof typeof destinations];

  if (!destination) {
    return <h1>Destination not found</h1>;
  }

  return (
    <div>
      <Headnav />

      <div className="px-4 py-10 lg:m-10">
        <h1 className="mb-10 text-center text-2xl font-bold">
          Top Hotels In {destination.name}
        </h1>

        <div className="grid grid-cols-2 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {destination.hotels.map((hotel, index) => (
            <div
              key={index}
              className="flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm sm:h-[120px] sm:flex-row"
            >
              {/* Image */}
              <img
                src={hotel.image}
                alt={hotel.name}
                className="h-[180px] w-full object-cover sm:h-full sm:w-[140px]"
              />

              {/* Hotel information */}
              <div className="flex flex-1 flex-col justify-center px-3 py-3">
                {/* Rating */}
                {hotel.rating > 0 && (
                  <div className="mb-1 text-sm text-yellow-500">
                    {"★".repeat(hotel.rating)}
                  </div>
                )}

                {/* Hotel name */}
                <h2 className="truncate text-sm font-medium">{hotel.name}</h2>

                {/* Location */}
                <p className="mt-1 text-xs text-gray-600">
                  📍 {hotel.location}
                </p>

                {/* Offer */}
                <a
                  href="#"
                  className="mt-2 text-sm text-blue-500 hover:underline"
                >
                  View Offer
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
