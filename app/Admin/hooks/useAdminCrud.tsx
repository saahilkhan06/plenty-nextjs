import { useState } from "react";

type UseAdminCrudProps<T extends { id: number }> = {
  initialData: T[];
  deleteMessage?: string;
};

export function useAdminCrud<T extends { id: number }>({
  initialData,
  deleteMessage = "Are you sure you want to delete this item?",
}: UseAdminCrudProps<T>) {
  const [data, setData] = useState<T[]>(initialData);

  const [showForm, setShowForm] = useState(false);

  const [editingItem, setEditingItem] = useState<T | null>(null);

  // ADD
  const handleAdd = () => {
    setEditingItem(null);
    setShowForm(true);
  };

  // EDIT
  const handleEdit = (item: T) => {
    setEditingItem(item);
    setShowForm(true);
  };

  // DELETE
  const handleDelete = (id: number) => {
    const confirmed = window.confirm(deleteMessage);

    if (!confirmed) {
      return;
    }

    setData((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  // SAVE
  const handleSave = (item: T) => {
    // EDIT EXISTING
    if (editingItem) {
      setData((prev) =>
        prev.map((existingItem) =>
          existingItem.id === item.id ? item : existingItem
        )
      );
    }

    // ADD NEW
    else {
      setData((prev) => [
        ...prev,
        item,
      ]);
    }

    setShowForm(false);
    setEditingItem(null);
  };

  // BACK
  const handleBack = () => {
    setShowForm(false);
    setEditingItem(null);
  };

  return {
    data,
    showForm,
    editingItem,

    handleAdd,
    handleEdit,
    handleDelete,
    handleSave,
    handleBack,
  };
}