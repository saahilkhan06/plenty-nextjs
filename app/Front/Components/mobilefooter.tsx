"use client";

import { Phone, MessageCircle } from "lucide-react";

export default function MobileFooter() {
  return (
    <div className="fixed bottom-0 left-0 z-50 w-full bg-amber-100 px-2 py-2 md:hidden">
      <div className="flex items-center justify-center gap-2">

        {/* Call Us */}
        <a
          href="tel:+442039947646"
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#06479E] px-3 py-2.5 text-base font-bold text-white"
        >
          <Phone size={15} strokeWidth={2} />
          <span>0203 994 7646</span>
        </a>

        {/* Chat With Us */}
        <button
          type="button"
          onClick={() => {
            // Add your chat opening logic here
          }}
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#1688E8] px-3 py-2.5 text-base font-bold text-white"
        >
          <MessageCircle size={15} strokeWidth={2} />
          <span>Chat With Us</span>
        </button>

      </div>
    </div>
  );
}