"use client";

import { useMemo, useState } from "react";
import { FiEdit2, FiPlus, FiSearch, FiTrash2 } from "react-icons/fi";

type Column<T> = {
  key: keyof T;
  label: string;
};

type AdminTableProps<T> = {
  title?: string;
  searchPlaceholder?: string;
  columns?: Column<T>[];
  data?: T[];
  onAdd?: () => void;
  onEdit?: (item: T) => void;
  onDelete?: (id: number) => void;
};

export default function AdminTable<T extends { id: number }>({
  title = "",
  searchPlaceholder = "Search...",
  columns = [],
  data = [],
  onAdd,
  onEdit,
  onDelete,
}: AdminTableProps<T>) {
  const [search, setSearch] = useState("");

  const filteredData = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) {
      return data;
    }

    return data.filter((item) => {
      return columns.some((column) => {
        const fieldValue = item[column.key];

        return String(fieldValue ?? "")
          .toLowerCase()
          .includes(value);
      });
    });
  }, [search, data, columns]);

  return (
    <div className="rounded-xl border border-stone-200 bg-white shadow-sm">
      {/* HEADER */}
      <div className="flex items-center justify-between border-b border-stone-200 px-5 py-2">
        <div>
          <h1 className="text-xl font-semibold text-stone-800">{title}</h1>

          <p className="mt-1 text-sm text-stone-500">
            Manage {title.toLowerCase()} here.
          </p>
        </div>

        <button
          type="button"
          onClick={onAdd}
          className="flex cursor-pointer items-center gap-2 rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-violet-700"
        >
          <FiPlus />
          Add New
        </button>
      </div>

      {/* SEARCH */}
      <div className="border-b border-stone-200 px-5 py-2">
        <div className="relative max-w-sm">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full rounded-lg border border-stone-300 py-2 pl-9 pr-3 text-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead>
            <tr className="border-b border-stone-200 bg-stone-50">
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-stone-500">
                ID
              </th>

              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  className="px-5 text-left text-xs font-semibold uppercase tracking-wide text-stone-500"
                >
                  {column.label}
                </th>
              ))}

              <th className="px-5 text-left text-xs font-semibold uppercase tracking-wide text-stone-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-stone-100 transition hover:bg-stone-50"
                >
                  {/* ID */}
                  <td className="px-5 text-sm font-medium text-stone-700">
                    {item.id}
                  </td>

                  {/* COLUMNS */}
                  {columns.map((column) => {
                    const value = item[column.key];

                    return (
                      <td
                        key={String(column.key)}
                        className="px-5 text-sm text-stone-600"
                      >
                        {column.key === "image" ? (
                          <img
                            src={String(value)}
                            alt="Destination"
                            className="h-4 w-15 object-cover"
                          />
                        ) : (
                          String(value ?? "-")
                        )}
                      </td>
                    );
                  })}

                  {/* ACTIONS */}
                  <td className="px-5 py-1">
                    <div className="flex items-center gap-2">
                      {/* EDIT */}
                      <button
                        type="button"
                        onClick={() => onEdit?.(item)}
                        className="flex cursor-pointer items-center gap-1.5 rounded-md border border-blue-200 px-2 text-xs font-medium text-blue-600 hover:bg-blue-200"
                      >
                        <FiEdit2 />
                        Edit
                      </button>

                      {/* DELETE */}
                      <button
                        type="button"
                        onClick={() => onDelete?.(item.id)}
                        className="flex cursor-pointer items-center gap-1.5 rounded-md border border-red-200 px-2 text-xs font-medium text-red-600 hover:bg-red-200"
                      >
                        <FiTrash2 />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length + 2}
                  className="px-5 py-10 text-center text-sm text-stone-500"
                >
                  No {title.toLowerCase()} found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* FOOTER */}
      <div className="flex items-center justify-between px-5 py-4 text-sm text-stone-500">
        <span>
          Showing {filteredData.length} of {data.length}
        </span>
      </div>
    </div>
  );
}
