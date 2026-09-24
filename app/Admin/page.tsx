"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { getAuthData } from "../Service/LocalStorage";

import { Dashboard } from "./components/Dashboard/Dashboard";

export default function Admin() {
  const router = useRouter();

  const [checkingAuth, setCheckingAuth] = useState(true);

  // useEffect(() => {
  //   const auth = getAuthData();

  //   if (!auth?.accessToken) {
  //     router.replace("/Admin");
  //     return;
  //   }

  //   setCheckingAuth(false);
  // }, [router]);

  // if (checkingAuth) {
  //   return null;
  // }

  return <Dashboard />;
}
