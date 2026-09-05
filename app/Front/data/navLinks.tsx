export type SimpleLink = {
  label: string;
  href: string;
};

export type DestinationCountry = {
  label: string;
  href?: string;
  children?: SimpleLink[];
};

export type DropdownColumn =
  | { type: "flat"; title: string; items: SimpleLink[] }
  | { type: "nested"; title: string; items: DestinationCountry[] };

export type NavLink = {
  label: string;
  href?: string;
  hasDropdown: boolean;
  dropdownColumns?: DropdownColumn[];
};

export const NAV_LINKS: NavLink[] = [
  {
    label: "Holidays",
    hasDropdown: true,
    dropdownColumns: [
      {
        type: "flat",
        title: "Deals Offers",
        items: [
          { label: "Affordable Luxury", href: "/holidays/affordable-luxury" },
          { label: "All Inclusive Holidays", href: "/holidays/all-inclusive" },
          { label: "Last Minute Deals", href: "/holidays/last-minute" },
          { label: "Romantic Escapes", href: "/holidays/romantic-escapes" },
        ],
      },
      {
        type: "flat",
        title: "Holiday Type",
        items: [
          { label: "Beach Holidays", href: "/holidays/beach" },
          { label: "Cheap Holidays", href: "/holidays/cheap" },
          { label: "City Breaks", href: "/holidays/city-breaks" },
        ],
      },
      {
        type: "flat",
        title: "Season Timing",
        items: [
          { label: "Christmas Market", href: "/holidays/christmas-market" },
          { label: "Spring Breaks", href: "/holidays/spring-breaks" },
          { label: "Summer Sun Holidays", href: "/holidays/summer-sun" },
          { label: "Winter Sun Holidays", href: "/holidays/winter-sun" },
        ],
      },
      {
        type: "flat",
        title: "Who Travelling",
        items: [
          { label: "Adults Only", href: "/holidays/adults-only" },
          { label: "Couple Holidays", href: "/holidays/couple" },
          { label: "Family Friendly Holidays", href: "/holidays/family-friendly" },
          { label: "Honeymoon Holidays", href: "/holidays/honeymoon" },
        ],
      },
    ],
  },
  {
    label: "Destinations",
    hasDropdown: true,
    dropdownColumns: [
      {
        type: "nested",
        title: "Popular Destinations",
        items: [
          {
            label: "Balearic Islands",
            children: [
              { label: "Ibiza", href: "/destinations/ibiza" },
              { label: "Majorca", href: "/destinations/majorca" },
              { label: "Menorca", href: "/destinations/menorca" },
            ],
          },
          {
            label: "Canary Islands",
            children: [
              { label: "Fuerteventura", href: "/destinations/fuerteventura" },
              { label: "Gran Canaria", href: "/destinations/gran-canaria" },
              { label: "Lanzarote", href: "/destinations/lanzarote" },
              { label: "Tenerife", href: "/destinations/tenerife" },
            ],
          },
          {
            label: "Caribbean Islands",
            children: [
              { label: "Barbados", href: "/destinations/barbados" },
              { label: "Jamaica", href: "/destinations/jamaica" },
            ],
          },
          { label: "Croatia", href: "/destinations/croatia" },
          { label: "Cyprus", href: "/destinations/cyprus" },
          { label: "Czech Republic", href: "/destinations/czech-republic" },
          { label: "Egypt", href: "/destinations/egypt" },
          { label: "Estonia", href: "/destinations/estonia" },
          { label: "Greece", href: "/destinations/greece" },
          { label: "Lithuania", href: "/destinations/lithuania" },
        ],
      },
      {
        type: "flat",
        title: "All Destinations",
        items: [
          { label: "Algarve", href: "/destinations/algarve" },
          { label: "Antalya", href: "/destinations/antalya" },
          { label: "Bodrum", href: "/destinations/bodrum" },
          { label: "Bourgas", href: "/destinations/bourgas" },
          { label: "Corfu", href: "/destinations/corfu" },
          { label: "Costa Blanca", href: "/destinations/costa-blanca" },
          { label: "Costa Brava", href: "/destinations/costa-brava" },
          { label: "Costa Del Sol", href: "/destinations/costa-del-sol" },
          { label: "Costa Dorada", href: "/destinations/costa-dorada" },
          { label: "Crete", href: "/destinations/crete" },
          { label: "Dalaman", href: "/destinations/dalaman" },
          { label: "Fuerteventura", href: "/destinations/fuerteventura" },
          { label: "Gran Canaria", href: "/destinations/gran-canaria" },
          { label: "Hurghada", href: "/destinations/hurghada" },
          { label: "Ibiza", href: "/destinations/ibiza" },
          { label: "Izmir", href: "/destinations/izmir" },
          { label: "Kos", href: "/destinations/kos" },
          { label: "Lanzarote", href: "/destinations/lanzarote" },
          { label: "Larnaca", href: "/destinations/larnaca" },
          { label: "Majorca", href: "/destinations/majorca" },
          { label: "Marrakech", href: "/destinations/marrakech" },
          { label: "Menorca", href: "/destinations/menorca" },
          { label: "Rhodes", href: "/destinations/rhodes" },
          { label: "Santorini", href: "/destinations/santorini" },
          { label: "Sharm el Sheikh", href: "/destinations/sharm-el-sheikh" },
          { label: "Tenerife", href: "/destinations/tenerife" },
          { label: "Zante", href: "/destinations/zante" },
        ],
      },
    ],
  },
  { label: "Nile Cruise", hasDropdown: false, href: "/Front/nile-cruise" },
  { label: "Multi Centre Holidays", hasDropdown: false, href: "/Front/multi-centre-holidays" },
  { label: "Blog", hasDropdown: false, href: "/Front/blog" },
  { label: "Help", hasDropdown: false, href: "/Front/help" },
];