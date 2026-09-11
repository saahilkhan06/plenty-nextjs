"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { getAuthData } from "../Service/LocalStorage";

import { Dashboard } from "./components/Dashboard/Dashboard";
import {Sidebar} from "./components/Sidebar/Sidebar";

export default function Admin() {
  const router = useRouter();

  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const auth = getAuthData();

    if (!auth?.accessToken) {
      router.replace("/Login");
      return;
    }

    setCheckingAuth(false);
  }, [router]);

  if (checkingAuth) {
    return null;
  }

  return (
    <main className="grid gap-4 p-4 grid-cols-[220px_1fr]">
      <Sidebar />
      <Dashboard />
    </main>
  );
}