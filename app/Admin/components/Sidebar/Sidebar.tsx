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
"use client";

import React from "react";
import { AccountToggle } from "./AccountToggle";
import { RouteSelect } from "./RouteSelect";

export const Sidebar = () => {
  return (
    <aside className="sticky top-0 h-screen w-full">
      <div className="h-full overflow-y-auto overflow-x-hidden px-2">
        <AccountToggle />

        <RouteSelect />
      </div>
    </aside>
  );
};
