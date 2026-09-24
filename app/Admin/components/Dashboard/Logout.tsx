"use client";

import { removeAuthData } from "@/app/Service/LocalStorage";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Logout() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = () => {
    setIsLoggingOut(true);

    removeAuthData();

    router.push("/Admin");
  };

  return (
    <div className="px-2 py-1">
      <button
        className="w-full cursor-pointer bg-red-300 py-2"
        onClick={handleLogout}
        disabled={isLoggingOut}
      >
        {isLoggingOut ? "Logging out..." : "Logout"}
      </button>
    </div>
  );
}