"use client";

import { useEffect, useRef, useState } from "react";
import { RiAccountCircleFill } from "react-icons/ri";
import Logout from "./Logout";
import Link from "next/link"

export default function AccountMenu() {
  const [open, setOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={menuRef} className="relative">
      {/* Account button */}
      <button
        onClick={() => setOpen(!open)}
        className="rounded-lg flex gap-2 items-center border border-stone-300 px-4 py-2 text-sm cursor-pointer"
      >
        <RiAccountCircleFill className="text-xl" />
        Account
      </button>

      {/* Account menu */}
      {open && (
        <div className="absolute right-0 top-12 z-50 w-56 rounded-lg border bg-white p-3 shadow-lg">
          <h3 className="mb-3 px-2 font-medium">Account Settings</h3>

          <Link href={"/Admin/Updatepassword"}>
            <button className="mb-2 w-full rounded-md px-3 py-2 text-left cursor-pointer bg-blue-700 text-white">
              Update Password
            </button>
          </Link>

          <Logout />
        </div>
      )}
    </div>
  );
}
