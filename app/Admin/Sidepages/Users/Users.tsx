"use client";

import { useMemo, useState } from "react";
import { FiSearch } from "react-icons/fi";

const users = [
  {
    id: 761,
    email: "xIGQ",
    name: "vlym vjXtvlym",
    date: "2026-08-29 17:52:32",
  },
  {
    id: 760,
    email: "liujose2000@yahoo.com",
    name: "Roman Bergnaum +1 (353) 734-6186",
    date: "2026-08-14 17:39:28",
  },
  {
    id: 759,
    email: "labustinrobert431166@yahoo.com",
    name: "Ruby Abshire +1 (471) 363-9289",
    date: "2026-08-13 07:26:09",
  },
  {
    id: 758,
    email: "amandawalker7jgu36ve@hotmail.com",
    name: "Nedra Spinka +1 (452) 362-7467",
    date: "2026-08-12 08:25:09",
  },
  {
    id: 757,
    email: "marrisbrittnkvto@khalsh.us",
    name: "Ryder Kerluke +1 (363) 943-1664",
    date: "2026-08-12 07:49:24",
  },
  {
    id: 756,
    email: "karlastark11x0@ghked.us",
    name: "Stephany Bahringer +1 (496) 340-7862",
    date: "2026-07-31 12:26:58",
  },
  {
    id: 755,
    email: "BLAINE.CALLAWAY@GMAIL.COM",
    name: "Leonardo Denesik +1 (627) 666-4924",
    date: "2026-07-31 11:43:03",
  },
];

export default function Users() {
  const [searchBy, setSearchBy] = useState("id");
  const [search, setSearch] = useState("");

  const filteredUsers = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (value.length < 2) {
      return users;
    }

    return users.filter((user) => {
      return String(user[searchBy as keyof typeof user])
        .toLowerCase()
        .includes(value);
    });
  }, [search, searchBy]);

  return (
    <div className="rounded-xl border border-stone-200 bg-white shadow-sm">
      {/* HEADER */}
      <div className="flex items-center justify-between border-b border-stone-200 px-5 py-2">
        <div>
          <h1 className="text-xl font-semibold text-stone-800">User Emails</h1>

          <p className="mt-1 text-sm text-stone-500">
            Manage user emails here.
          </p>
        </div>
      </div>

      {/* SEARCH */}
      <div className="border-b border-stone-200 px-5 py-2">
        <div className="flex items-center gap-3">
          {/* SEARCH FIELD */}
          <div className="relative w-[140px]">
            <select
              value={searchBy}
              onChange={(e) => {
                setSearchBy(e.target.value);
                setSearch("");
              }}
              className="
                h-[44px]
                w-full
                appearance-auto
                rounded-lg
                border
                border-stone-300
                bg-white
                px-3
                text-sm
                outline-none
                focus:border-violet-500
                focus:ring-2
                focus:ring-violet-100
              "
            >
              <option value="id">Id</option>
              <option value="email">Email</option>
              <option value="name">Name</option>
              <option value="date">Date</option>
            </select>
          </div>

          {/* INPUT */}
          <div className="relative w-[170px]">
            <FiSearch
              className="
                absolute
                left-3
                top-1/2
                -translate-y-1/2
                text-stone-400
              "
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
                h-[44px]
                w-full
                rounded-lg
                border
                border-stone-300
                pl-9
                pr-3
                text-sm
                outline-none
                focus:border-violet-500
                focus:ring-2
                focus:ring-violet-100
              "
            />
          </div>
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

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-stone-500">
                Email
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-stone-500">
                Name
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-stone-500">
                Date
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="
                    border-b
                    border-stone-100
                    transition
                    hover:bg-stone-50
                  "
                >
                  <td className="px-5 text-sm font-medium text-stone-700">
                    {user.id}
                  </td>

                  <td className="px-5 text-sm text-stone-600">{user.email}</td>

                  <td className="px-5 text-sm text-stone-600">{user.name}</td>

                  <td className="px-5 text-sm text-stone-600">{user.date}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="px-5 py-10 text-center text-sm text-stone-500"
                >
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* FOOTER */}
      <div className="flex items-center justify-between px-5 py-4 text-sm text-stone-500">
        <span>
          Showing {filteredUsers.length} of {users.length}
        </span>
      </div>
    </div>
  );
}
