"use client";

import AdminTable from "../../components/AdminTable";

const locations = [
  {
    id: 52,
    location: "London City",
    airportCode: "LCY",
    type: "airports",
    status: "Active",
  },
  {
    id: 51,
    location: "Dublin",
    airportCode: "DUB",
    type: "airports",
    status: "Active",
  },
  {
    id: 50,
    location: "Cork",
    airportCode: "ORK",
    type: "airports",
    status: "Active",
  },
  {
    id: 49,
    location: "Southampton",
    airportCode: "SOU",
    type: "airports",
    status: "Active",
  },
  {
    id: 48,
    location: "London - Southend",
    airportCode: "SEN",
    type: "airports",
    status: "Active",
  },
  {
    id: 47,
    location: "Glasgow-Prestwick",
    airportCode: "PIK",
    type: "airports",
    status: "Active",
  },
];

export default function Locations() {
  return (
    <AdminTable
      title="Locations"
      searchPlaceholder="Search locations..."
      columns={[
        {
          key: "location",
          label: "Location",
        },
        {
          key: "airportCode",
          label: "Airport Code",
        },
        {
          key: "type",
          label: "Type",
        },
        {
          key: "status",
          label: "Status",
        },
      ]}
      data={locations}
    />
  );
}
