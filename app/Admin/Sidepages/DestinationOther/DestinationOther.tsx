"use client";

import AdminTable from "../../components/AdminTable";
import OtherDestinationForm from "./Otherform";
import { useAdminCrud } from "../../hooks/useAdminCrud";

type OtherDestination = {
  id: number;
  destination: string;
  airportCode: string;
  image: string;
  status: string;
};

const initialDestinations: OtherDestination[] = [
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
  {
    id: 4,
    destination: "Bali",
    airportCode: "DPS",
    image:
      "https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?auto=format&fit=crop&w=800&q=80",
    status: "Active",
  },
];

export default function OtherDestinations() {
  const {
    data: destinations,
    showForm,
    editingItem: editingDestination,
    handleAdd,
    handleEdit,
    handleDelete,
    handleSave,
    handleBack,
  } = useAdminCrud<OtherDestination>({
    initialData: initialDestinations,
    deleteMessage: "Are you sure you want to delete this destination?",
  });

  // FORM
  if (showForm) {
    return (
      <OtherDestinationForm
        onBack={handleBack}
        onSave={handleSave}
        editingDestination={editingDestination}
      />
    );
  }

  // TABLE
  return (
    <AdminTable
      title="Other Destinations"
      searchPlaceholder="Search destinations..."
      onAdd={handleAdd}
      onEdit={handleEdit}
      onDelete={handleDelete}
      columns={[
        {
          key: "destination",
          label: "Destination",
        },
        {
          key: "destination",
          label: "Main Destination",
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
