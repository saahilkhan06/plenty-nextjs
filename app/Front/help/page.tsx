import Headnav from "../Components/Headnav/Headnav";
import Image from "next/image";

export default function Help() {
  return (
    <>
      <Headnav />

      {/* Hero Section */}
      <div className="relative">
        <Image
          alt="contact"
          src="/assets/img/contact.jpg"
          className="w-full h-100 object-cover"
          width={4096}
          height={1672}
          priority
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Text on image */}
        <div className="absolute inset-0 z-10 flex flex-col justify-center gap-6 p-8 md:p-20 text-white">
          <h1 className="text-4xl md:text-7xl font-bold">Welcome to BLOG</h1>

          <h2 className="max-w-4xl text-base md:text-xl">
            Meet Natasha, she’s an extremely talented writer who creates great
            content. Our team at Plenty holidays have the privilege to work and
            travel with her to many beautiful destinations and have had some
            great experiences.
          </h2>
        </div>
      </div>

      {/* Get In Touch Section */}
      <div className="bg-[#fdf8ee] rounded-3xl shadow-xl px-6 py-10 md:px-10 md:py-12 max-w-6xl mx-auto -mt-20 md:-mt-20 relative z-10 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
          Get In Touch
        </h2>

        <div className="flex flex-col md:flex-row gap-6 justify-center">
          {/* Call Us */}
          <div className="flex-1 bg-white rounded-2xl shadow-sm p-6 text-left">
            <div className="w-11 h-11 bg-yellow-200 rounded-xl flex items-center justify-center mb-4">
              <svg
                className="w-5 h-5 text-blue-800"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21c1.21.49 2.53.76 3.88.76a1 1 0 011 1V20a1 1 0 01-1 1C10.61 21 3 13.39 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.35.27 2.67.76 3.88a1 1 0 01-.21 1.11l-2.43 2.8z" />
              </svg>
            </div>

            <h3 className="text-lg font-semibold text-blue-900 mb-3">
              Call Us
            </h3>

            <p className="text-lg font-bold text-gray-900">0203 994 7646</p>

            <p className="text-sm text-gray-500 mt-1">
              Free from UK landlines & mobiles
            </p>
          </div>

          {/* Email Us */}
          <div className="flex-1 bg-white rounded-2xl shadow-sm p-6 text-left">
            <div className="w-11 h-11 bg-yellow-200 rounded-xl flex items-center justify-center mb-4">
              <svg
                className="w-5 h-5 text-blue-800"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M2 4h20v16H2V4zm2 2v.01L12 12l8-5.99V6H4zm16 12V8.24l-8 6-8-6V18h16z" />
              </svg>
            </div>

            <h3 className="text-lg font-semibold text-blue-900 mb-3">
              Email Us
            </h3>

            <p className="text-lg font-bold text-gray-900 wrap-break-word">
              support@plentyholidays.co.uk
            </p>

            <p className="text-sm text-gray-500 mt-1">
              We aim to reply within 24–48 hours
            </p>
          </div>

          {/* Opening Hours */}
          <div className="flex-1 bg-white rounded-2xl shadow-sm p-6 text-left">
            <div className="w-11 h-11 bg-yellow-200 rounded-xl flex items-center justify-center mb-4">
              <svg
                className="w-5 h-5 text-blue-900"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 10.41l4.29 4.3-1.41 1.41L11 13.41V6h2v6.41z" />
              </svg>
            </div>

            <h3 className="text-lg font-semibold text-blue-900 mb-3">
              Opening Hours
            </h3>

            <p className="text-lg font-bold text-gray-900">
              Everyday: 8am – 11pm
            </p>

            <p className="text-sm text-gray-500 mt-1">
              We are available from Sunday to Saturday
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
