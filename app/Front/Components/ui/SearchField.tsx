"use client";

export default function SearchField({
  id,
  label,
  icon: Icon,
  placeholder,
  widthClass = "w-full sm:w-auto sm:flex-1",
  value,
  onClick,
  isOpen,
  children,
  dropdownWidth = "field",
  panelClassName,
}: {
  id: string;
  label: string;
  icon: React.ElementType;
  placeholder: string;
  widthClass?: string;
  value?: string;
  onClick?: () => void;
  isOpen?: boolean;
  children?: React.ReactNode;
  dropdownWidth?: "field" | "full";
  panelClassName?: string;
}) {
  return (
    <div className={`flex flex-col gap-2.5 ${widthClass}`}>
      <label htmlFor={id} className="text-lg font-semibold">
        {label}
      </label>

      <div className="relative">
        <Icon
          size={18}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-black"
        />
        <input
          id={id}
          type="text"
          readOnly
          value={value}
          onClick={onClick}
          placeholder={placeholder}
          className="w-full cursor-pointer rounded-[5px] border-none bg-white p-3.5 pl-11 text-black outline-none"
        />

        {/* Small dropdown — Destination — anchored to this field only */}
        {isOpen && dropdownWidth === "field" && (
          <div
            className={
              panelClassName ??
              "absolute left-0 top-full z-50 mt-2 w-[90vw] max-w-md rounded-lg bg-white p-4 shadow-2xl"
            }
          >
            {children}
          </div>
        )}
      </div>

      {/* Full-width dropdown — anchored to the nearest `relative` ancestor,
          which is the search-bar row in page.tsx, NOT this field.
          No JS, no fixed, no scroll listeners — pure CSS, scrolls natively. */}
      {isOpen && dropdownWidth === "full" && (
        <div className="absolute inset-x-0 top-full z-50 mt-2 rounded-lg bg-white p-6 shadow-2xl">
          {children}
        </div>
      )}
    </div>
  );
}