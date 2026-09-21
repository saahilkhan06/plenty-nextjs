"use client";

import { Phone, MessageCircleMore } from "lucide-react";
import Link from "next/link";
export default function MobileFooter() {
  return (
    <div className="fixed bottom-0 left-0 z-50 w-full bg-amber-100 px-2 py-2 md:hidden">
      <div className="flex items-center justify-center gap-2">
        {/* Call Us */}
        <Link
          href="tel:+442039947646"
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#06479E] px-3 py-2.5 text-base font-bold text-white"
        >
          <Phone size={24} strokeWidth={3} />
          <span>0203 994 7646</span>
        </Link>

        {/* Chat With Us */}
        <Link
          href="https://wa.me/442039947646"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#1688E8] px-3 py-2.5 text-base font-bold text-white"
        >
          <MessageCircleMore size={24} strokeWidth={3} />
          <span>Chat With Us</span>
        </Link>
      </div>
    </div>
  );
}
