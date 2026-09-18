// "use client";

// import { useEffect, useRef, useState } from "react";
// import { RiMessage2Fill } from "react-icons/ri";

// export default function MessageMenu() {
//   const [open, setOpen] = useState(false);

//   const menuRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
//         setOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return (
//     <div ref={menuRef} className="relative">
//       {/* Message button */}
//       <button
//         onClick={() => setOpen(!open)}
//         className="rounded-lg flex gap-2 items-center border border-stone-300 px-4 py-2 text-sm cursor-pointer"
//       >
//         <RiMessage2Fill className="text-xl" />
//       </button>

//       {/* Message menu */}
//       {open && (
//         <div className="absolute right-0 top-12 z-50 w-56 rounded-lg border bg-white p-3 shadow-lg">
//           <h3 className="mb-3 px-2 font-medium">Messages</h3>

          
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import { useEffect, useRef, useState } from "react";
import { RiMessage2Fill } from "react-icons/ri";

export default function MessageMenu() {
  const [open, setOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={menuRef} className="relative shrink-0">
      <button
        onClick={() => setOpen(!open)}
        className="rounded-lg flex gap-2 items-center border border-stone-300 px-3 sm:px-4 py-2 text-sm cursor-pointer"
      >
        <RiMessage2Fill className="text-xl" />
      </button>

      {open && (
        <div className="absolute right-0 top-12 z-50 w-56 max-w-[calc(100vw-24px)] rounded-lg border bg-white p-3 shadow-lg">
          <h3 className="mb-3 px-2 font-medium">
            Messages
          </h3>
        </div>
      )}
    </div>
  );
}
