import Image from "next/image";
import Link from "next/link";
import MobileFooter from "./mobilefooter";
const SOCIAL_LINKS = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/plentyholidays",
    path: "M14 9h3V6h-3c-1.657 0-3 1.343-3 3v2H9v3h2v6h3v-6h3l1-3h-4v-2c0-.552.448-1 1-1z",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/plentyholidays.co.uk",
    path: "M12 2c-2.72 0-3.06.012-4.123.06-1.062.05-1.79.218-2.425.465a4.9 4.9 0 0 0-1.772 1.153A4.9 4.9 0 0 0 2.526 5.45c-.247.636-.415 1.363-.465 2.425C2.012 8.94 2 9.28 2 12s.012 3.06.06 4.123c.05 1.062.218 1.79.465 2.425a4.9 4.9 0 0 0 1.153 1.772 4.9 4.9 0 0 0 1.772 1.153c.636.247 1.363.415 2.425.465C8.94 21.988 9.28 22 12 22s3.06-.012 4.123-.06c1.062-.05 1.79-.218 2.425-.465a4.9 4.9 0 0 0 1.772-1.153 4.9 4.9 0 0 0 1.153-1.772c.247-.636.415-1.363.465-2.425.048-1.063.06-1.403.06-4.123s-.012-3.06-.06-4.123c-.05-1.062-.218-1.79-.465-2.425a4.9 4.9 0 0 0-1.153-1.772A4.9 4.9 0 0 0 18.548 2.53c-.636-.247-1.363-.415-2.425-.465C15.06 2.012 14.72 2 12 2zm0 1.802c2.67 0 2.987.01 4.042.059.976.045 1.505.207 1.858.344.467.182.8.399 1.15.748.35.35.566.683.748 1.15.137.353.3.882.344 1.858.048 1.055.058 1.372.058 4.042s-.01 2.987-.058 4.042c-.045.976-.207 1.505-.344 1.858a3.1 3.1 0 0 1-.748 1.15 3.1 3.1 0 0 1-1.15.748c-.353.137-.882.3-1.858.344-1.055.048-1.372.058-4.042.058s-2.987-.01-4.042-.058c-.976-.045-1.505-.207-1.858-.344a3.1 3.1 0 0 1-1.15-.748 3.1 3.1 0 0 1-.748-1.15c-.137-.353-.3-.882-.344-1.858-.048-1.055-.058-1.372-.058-4.042s.01-2.987.058-4.042c.045-.976.207-1.505.344-1.858.182-.467.399-.8.748-1.15a3.1 3.1 0 0 1 1.15-.748c.353-.137.882-.3 1.858-.344 1.055-.048 1.372-.059 4.042-.059zm0 3.064a5.134 5.134 0 1 0 0 10.268 5.134 5.134 0 0 0 0-10.268zm0 8.468a3.334 3.334 0 1 1 0-6.668 3.334 3.334 0 0 1 0 6.668zm6.538-8.671a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0z",
  },
  {
    label: "Pinterest",
    href: "https://www.pinterest.com/plentyholidays",
    path: "M12 2C6.477 2 2 6.477 2 12c0 4.237 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.183-.78 1.176-4.97 1.176-4.97s-.3-.6-.3-1.485c0-1.39.807-2.428 1.812-2.428.855 0 1.268.642 1.268 1.41 0 .86-.548 2.145-.83 3.338-.236.998.5 1.812 1.484 1.812 1.78 0 3.148-1.877 3.148-4.583 0-2.397-1.723-4.073-4.182-4.073-2.849 0-4.52 2.137-4.52 4.346 0 .861.331 1.784.745 2.286a.3.3 0 0 1 .069.288c-.076.316-.245.998-.278 1.137-.044.183-.145.222-.334.134-1.246-.58-2.024-2.402-2.024-3.867 0-3.15 2.288-6.043 6.598-6.043 3.464 0 6.157 2.469 6.157 5.768 0 3.443-2.17 6.213-5.183 6.213-1.012 0-1.964-.526-2.29-1.148l-.623 2.375c-.226.869-.836 1.958-1.244 2.622A9.973 9.973 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z",
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/442039947646",
    path: "M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.33 4.96L2 22l5.29-1.39a9.86 9.86 0 0 0 4.75 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.87 9.87 0 0 0 12.04 2zm5.79 14.06c-.24.68-1.4 1.31-1.94 1.35-.5.05-1.11.07-1.79-.11-.41-.11-.94-.29-1.62-.58-2.86-1.24-4.72-4.11-4.86-4.31-.14-.19-1.16-1.54-1.16-2.94 0-1.4.73-2.09 1-2.38.24-.26.53-.32.7-.32h.51c.16 0 .38-.06.6.46.24.57.82 1.97.9 2.11.07.14.12.31.02.5-.09.19-.14.31-.28.48-.14.16-.29.36-.42.48-.14.14-.28.29-.12.57.16.28.71 1.17 1.53 1.9 1.05.94 1.94 1.23 2.22 1.37.28.14.44.12.6-.07.16-.19.68-.79.86-1.06.19-.28.37-.23.63-.14.26.09 1.64.77 1.92.91.28.14.47.21.53.33.07.12.07.68-.17 1.36z",
  },
  {
    label: "X / Twitter",
    href: "https://x.com/PlentyHoliday",
    path: "M18.244 2H21.5l-7.5 8.57L22.8 22h-6.9l-5.4-7.06L4.3 22H1.04l8.03-9.17L1.2 2h7.06l4.88 6.46L18.244 2zm-1.21 18h1.9L7.02 4H5l12.034 16z",
  },
];

const DESTINATIONS = ["Menorca", "Dubai", "Santorini", "Berlin", "Rome"];
const HOLIDAY_TYPES = [
  "City Breaks",
  "Cheap Holidays",
  "Winter Sun Holidays",
  "Family Friends Holidays",
  "All Inclusive Holidays",
];
const QUICK_LINKS = [
  "Travel Insurance",
  "Airport Hotels",
  "Airport Lounges",
  "Airport Parking",
  "Travel Information",
  "Travel Alert",
];
const INFORMATION = [
  "About Us",
  "Contact Us",
  "Terms and Conditions",
  "Privacy Policy",
  "FAQs",
];
const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="bg-white pb-14 text-black md:pb-0">
      <section className="mb-8 flex flex-wrap items-center justify-between gap-10 bg-[#FFC72C] px-6 py-6 sm:px-14 sm:py-8 lg:py-16">
        <div className="max-w-120">
          <p className=" text-sm font-semibold text-[#10254e]">
            OUR NEWSLETTER
          </p>
          <h2 className="text-[26px] font-bold text-black sm:text-[34px]">
            Never Miss a Deal
          </h2>
          <p className="text-sm leading-relaxed text-black">
            Subscribe to our newsletter and be the first to know about exclusive
            offers and flash sales
          </p>
          <div>
            <Link href="/front/enquery">
              <button className="mt-5 bg-black text-white p-3 cursor-pointer rounded-2xl hover:bg-white  hover:text-black">
                → Enquire Now
              </button>
            </Link>
          </div>
        </div>

        <div className="flex w-full max-w-md items-center justify-center overflow-hidden rounded-full bg-white shadow-lg sm:w-auto lg:max-w-lg">
          <form className="flex w-full">
            <input
              type="email"
              id="email"
              autoComplete="email"
              placeholder="Enter your email"
              required
              className="min-w-0 flex-1 bg-transparent px-5 py-3 text-sm text-gray-700 outline-none placeholder:text-gray-400 lg:px-6 lg:py-4 lg:text-base"
            />
            <button
              type="submit"
              className="shrink-0 whitespace-nowrap rounded-full bg-[#2B1B4C] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#3a2566] lg:px-8 lg:py-4 lg:text-base"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
      {/* Trust badges */}
      <div className="flex flex-nowrap justify-center gap-4 sm:gap-10 overflow-x-auto border-b border-gray-200 px-5 py-5">
        {" "}
        <div className="flex items-center gap-2">
          <img
            src="/assets/img/ATOL.png"
            alt="ATOL Protected"
            className="h-12"
            width={56}
            height={56}
          />
          <span className="text-sm leading-tight">
            <strong className="block text-lg">ATOL</strong> protected
          </span>
        </div>
        <div className="flex items-center gap-2 ">
          <Image
            src="/assets/img/tta.png"
            alt="Travel Trust Association"
            className="h-12"
            width={96}
            height={61}
          />
          <span className="text-sm leading-tight">
            <strong className="block text-lg">TTA Member</strong>
            <p className="text-xs">Travel trust Association</p>
          </span>
        </div>
      </div>

      {/* Main columns */}
      <div className="mx-auto text-black text-md flex max-w-350 flex-col flex-wrap gap-10 px-6 py-10 md:flex-row md:justify-between">
        <div className="flex flex-col gap-4 text-black">
          <img
            src="/assets/img/plenty-logo.png"
            alt="Plenty Holidays"
            className="h-auto w-60"
          />
          <h3 className="font-semibold">Get In Touch</h3>
          <p className="font-semibold">📞 0203 994 7646</p>
          <p className="font-semibold">✉️ info@plentyholidays.co.uk</p>
          <p className="font-semibold">🕐 Monday to Sunday: 8am to 11pm</p>
          <div className="flex gap-4">
            {SOCIAL_LINKS.map(({ label, href, path }) => (
              <Link
                key={label}
                target="_blank"
                href={href}
                aria-label={label}
                rel="noreferrer"
              >
                <svg
                  viewBox="0 0 24 24"
                  width={22}
                  height={22}
                  fill="currentColor"
                >
                  <path d={path} />
                </svg>
              </Link>
            ))}
          </div>
        </div>

        <FooterColumn title="Destinations" items={DESTINATIONS} />
        <FooterColumn title="Holiday Types" items={HOLIDAY_TYPES} />
        <FooterColumn title="Quick Links" items={QUICK_LINKS} />
        <FooterColumn title="Information" items={INFORMATION} />
      </div>

      <hr className="border-gray-200" />

      <p className="px-5 py-5 text-center text-sm">
        Copyright © {currentYear} Plenty Holidays | All Rights Reserved
      </p>
      <MobileFooter />
    </footer>
  );
}

function FooterColumn({
  title,
  items,
}: {
  readonly title: string;
  readonly items: readonly string[];
}) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-semibold ">{title}</h3>
      <ul className="flex flex-col gap-2.5">
        {items.map((item) => (
          <li
            key={item}
            className="cursor-pointer  text-sm text-gray-700 hover:text-black"
          >
            <span className="animated-underline">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
