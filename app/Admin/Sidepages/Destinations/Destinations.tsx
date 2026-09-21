"use client";

import { useState } from "react";
import AdminTable from "../../components/AdminTable";
// import NewDestinationForm from "./NewDestinationForm";

type Destination = {
  id: number;
  destination: string;
  airportCode: string;
  image: string;
  status: string;
};

const initialDestinations: Destination[] = [
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

export default function Destinations() {
  const [destinations, setDestinations] =
    useState<Destination[]>(initialDestinations);

  const [showForm, setShowForm] = useState(false);

  const [editingDestination, setEditingDestination] =
    useState<Destination | null>(null);

  // ADD
  // const handleAdd = () => {
  //   setEditingDestination(null);
  //   setShowForm(true);
  // };

  // // EDIT
  // const handleEdit = (destination: Destination) => {
  //   setEditingDestination(destination);
  //   setShowForm(true);
  // };

  // // DELETE
  // const handleDelete = (id: number) => {
  //   const confirmed = window.confirm(
  //     "Are you sure you want to delete this destination?"
  //   );

    // if (!confirmed) {
    //   return;
    // }

  //   setDestinations((prev) =>
  //     prev.filter((destination) => destination.id !== id)
  //   );
  // };

  // // SAVE
  // const handleSave = (destination: Destination) => {
  //   // EDIT EXISTING
  //   if (editingDestination) {
  //     setDestinations((prev) =>
  //       prev.map((item) =>
  //         item.id === destination.id ? destination : item
  //       )
  //     );
  //   }

  //   // ADD NEW
  //   else {
  //     setDestinations((prev) => [
  //       ...prev,
  //       destination,
  //     ]);
  //   }

  //   setShowForm(false);
  //   setEditingDestination(null);
  // };

  // FORM
  // if (showForm) {
  //   return (
  //     <NewDestinationForm
  //       onBack={() => {
  //         setShowForm(false);
  //         setEditingDestination(null);
  //       }}
  //       onSave={handleSave}
  //       editingDestination={editingDestination}
  //     />
  //   );
  // }

  // TABLE
  return (
    <AdminTable
      title="Destinations"
      searchPlaceholder="Search destinations..."
      // onAdd={handleAdd}
      // onEdit={handleEdit}
      // onDelete={handleDelete}
      columns={[
        {
          key: "destination",
          label: "Destination",
        },
        {
          key: "airportCode",
          label: "Airport Code",
        },
        {
          key: "image",
          label: "Image",
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