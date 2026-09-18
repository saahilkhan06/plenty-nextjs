import Link from "next/link";
import React from "react";


export const AccountToggle = () => {
  return (
    <div className="border-b mb-4 mt-2 pb-4 border-stone-300 text-white">
      <Link href="https://plenty-nextjs.onrender.com">
      <button  className="flex p-0.5 relative gap-3 w-full items-center">
        <img
          src="../iconplenty.png"
          alt="avatar"
          className="size-8 rounded shrink-0 bg-white shadow"
        />
        <div className="text-start">
          <span className="text-sm font-bold block">Plenty Holidays </span>
          <span className="text-xs block ">
            Plentyholidays@gmail.com
          </span>
        </div>
        
      </button>
      </Link>
    </div>
  );
};
