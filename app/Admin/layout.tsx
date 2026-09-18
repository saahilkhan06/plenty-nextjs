// import { Sidebar } from "./components/Sidebar/Sidebar";

// export default function AdminLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <main className="grid h-screen grid-cols-[220px_1fr] gap-4 overflow-hidden bg-gray-800 p-4">
//       {/* Constant sidebar */}
//       <Sidebar />

//       {/* This area changes */}
//       <section className="min-w-0 overflow-y-auto">{children}</section>
//     </main>
//   );
// }

"use client";

import { useState } from "react";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { FiMenu, FiX } from "react-icons/fi";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <main className="relative grid min-h-screen grid-cols-1 lg:h-screen lg:grid-cols-[220px_1fr] lg:gap-4 overflow-hidden bg-gray-800 p-0 lg:p-4">

      {/* Sidebar */}
      <Sidebar
        open={sidebarOpen}
        setOpen={setSidebarOpen}
      />

      {/* Mobile hamburger */}
      <button
        type="button"
        onClick={() => setSidebarOpen(true)}
        className="
          fixed
          left-3
          top-3
          z-[9999]
          flex
          h-9
          w-9
          items-center
          justify-center
          rounded-lg
          bg-gray-800
          text-white
          shadow-lg
          lg:hidden
        "
        aria-label="Open sidebar"
      >
        <FiMenu className="text-xl" />
      </button>

      {/* Content */}
      <section className="min-w-0 overflow-y-auto pt-14 lg:pt-0">
        {children}
      </section>
    </main>
  );
}