"use client";

import { removeAuthData } from "@/app/Service/LocalStorage";
import { useRouter } from "next/navigation";

export default function Logout() {
  const router = useRouter();

  const handleLogout = () => {
    removeAuthData();
    router.push("/Login");
  };

  return (
    <div className="px-2 py-1">
      <button
        className="w-full cursor-pointer bg-red-300 py-2"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}