"use client";

import AdminTable from "../../components/AdminTable";

const destinations = [
  {
    id: 1,
    destination: "Maldives",
    airportCode: "MLE",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    status: "Active",
  },
  {
    id: 2,
    destination: "Goa",
    airportCode: "GOI",
    image:
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80",
    status: "Active",
  },
  {
    id: 3,
    destination: "Bali",
    airportCode: "DPS",
    image:
      "https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?auto=format&fit=crop&w=800&q=80",
    status: "Active",
  },
];

export default function TrendingHotel() {
  return (
    <AdminTable
      title="Destinations"
      searchPlaceholder="Search destinations..."
      columns={[
        {
          key: "destination",
          label: "Type",
        },
        {
          key: "airportCode",
          label: "Hotel Name",
        },
        {
          key: "airportCode",
          label: "Select Rating",
        },
        {
          key: "airportCode",
          label: "Nights",
        },
        {
          key: "airportCode",
          label: "Price",
        },
        {
          key: "status",
          label: "Status",
        },
      ]}
      data={destinations}
    />
  );
}
