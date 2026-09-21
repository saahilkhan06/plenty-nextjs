"use client";

import React from "react";

type AccountToggleProps = {
  sidebarOpen: boolean;
};

export const AccountToggle = ({
  sidebarOpen,
}: AccountToggleProps) => {
  return (
    <div
      className={`
        border-b
        border-slate-700
        pb-4
        mb-4
        ${sidebarOpen ? "mt-2" : "mt-2"}
      `}
    >
      <button
        type="button"
        className={`
          flex
          w-full
          items-center
          rounded
          p-1
          transition
          hover:bg-slate-800

          ${
            sidebarOpen
              ? "gap-2"
              : "justify-center"
          }
        `}
      >
        {/* LOGO */}

        <img
          src="/iconplenty.png"
          alt="Plenty Holidays"
          className="
            h-10
            w-10
            bg-white
            shrink-0
            rounded
            object-fill
          "
        />

        {/* ACCOUNT DETAILS */}

        {sidebarOpen && (
          <>
            <div className="min-w-0 flex-1 text-left">
              <span className="block whitespace-nowrap text-sm font-bold text-white">
                Plenty Holidays
              </span>

              <span className="block whitespace-nowrap text-xs text-slate-400">
                Plentyholidays@gmail.com
              </span>
            </div>

          </>
        )}
      </button>
    </div>
  );
};