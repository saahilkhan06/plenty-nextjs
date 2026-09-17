import { Sidebar } from "./components/Sidebar/Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="grid h-screen grid-cols-[220px_1fr] gap-4 overflow-hidden bg-gray-800 p-4">
      {/* Constant sidebar */}
      <Sidebar />

      {/* This area changes */}
      <section className="min-w-0 overflow-y-auto">{children}</section>
    </main>
  );
}
