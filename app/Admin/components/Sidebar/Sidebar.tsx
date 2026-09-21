// "use client";

// import React, { useState } from "react";
// import { AccountToggle } from "./AccountToggle";
// import { Search } from "./Search";
// import { RouteSelect } from "./RouteSelect";
// import { CommandMenu } from "./CommandMenu";
// const SearchWithProps = Search as React.ComponentType<{
//   open: boolean;
//   setOpen: React.Dispatch<React.SetStateAction<boolean>>;
// }>;

// export const Sidebar = () => {
//   const [open, setOpen] = useState(false);

//   return (
//     <div className="sticky top-0 flex h-screen w-full flex-col">
//       {/* Sidebar content */}
//       <div className="min-h-0 flex-1 overflow-hidden">
//         <AccountToggle />

//         <SearchWithProps open={open} setOpen={setOpen} />

//         <RouteSelect />
//       </div>

//       {/* Command menu */}
//       <CommandMenu open={open} setOpen={setOpen} />

//       {/* Logout ABOVE Plan */}

//       {/* Enterprise + Support */}
//     </div>
//   );
// };
// "use client";

// import React from "react";
// import { AccountToggle } from "./AccountToggle";
// import { RouteSelect } from "./RouteSelect";

// export const Sidebar = () => {
//   return (
//     <aside className="sticky top-0 h-screen w-full">
//       <div className="h-full overflow-y-auto overflow-x-hidden px-2">
//         <AccountToggle />

//         <RouteSelect />
//       </div>
//     </aside>
//   );
// };
"use client";

// import React, { Dispatch, SetStateAction } from "react";
// import { AccountToggle } from "./AccountToggle";
// import { RouteSelect } from "./RouteSelect";
// import { FiX } from "react-icons/fi";

// export const Sidebar = ({
//   open,
//   setOpen,
// }: {
//   open: boolean;
//   setOpen: Dispatch<SetStateAction<boolean>>;
// }) => {
//   return (
//     <>
//       {/* Mobile overlay */}
//       {open && (
//         <div
//           className="fixed inset-0 z-[9997] bg-black/50 lg:hidden"
//           onClick={() => setOpen(false)}
//         />
//       )}

//       <aside
//         className={`
//           fixed
//           left-0
//           top-0
//           z-[9998]
//           h-screen
//           w-[220px]
//           bg-gray-800
//           transition-transform
//           duration-300
//           lg:sticky
//           lg:z-auto
//           lg:top-0
//           lg:h-screen
//           lg:w-full
//           lg:translate-x-0

//           ${
//             open
//               ? "translate-x-0"
//               : "-translate-x-full lg:translate-x-0"
//           }
//         `}
//       >
//         {/* Mobile close button */}
//         <button
//           type="button"
//           onClick={() => setOpen(false)}
//           className="
//             absolute
//             right-3
//             top-3
//             z-10
//             flex
//             h-8
//             w-8
//             items-center
//             justify-center
//             rounded-lg
//             bg-gray-700
//             text-white
//             lg:hidden
//           "
//           aria-label="Close sidebar"
//         >
//           <FiX className="text-lg" />
//         </button>

//         <div className="h-full overflow-y-auto overflow-x-hidden px-2">
//           <AccountToggle />

//           <RouteSelect />
//         </div>
//       </aside>
//     </>
//   );
// };

"use client";

import React from "react";
import { FiMenu } from "react-icons/fi";

import { AccountToggle } from "./AccountToggle";
import { RouteSelect } from "./RouteSelect";

type SidebarProps = {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  return (
    <aside className="h-screen w-full overflow-hidden bg-slate-900 text-white">
      <div className="h-full overflow-y-auto px-2">
        {/* HAMBURGER */}
        <div
          className={`
            flex
            h-[60px]
            items-center
            border-b
            border-slate-700
            ${sidebarOpen ? "justify-end px-3" : "justify-center px-0"}
          `}
        >
          <button
            type="button"
            onClick={() => setSidebarOpen((prev) => !prev)}
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-md
              text-slate-300
              transition
              hover:bg-slate-700
              hover:text-white
            "
          >
            <FiMenu size={22} />
          </button>
        </div>

        {/* ACCOUNT */}
        <div className="px-2">
          <AccountToggle sidebarOpen={sidebarOpen} />
        </div>

        {/* ROUTES */}
        <div className="px-2">
          <RouteSelect sidebarOpen={sidebarOpen} />
        </div>
      </div>
    </aside>
  );
};
