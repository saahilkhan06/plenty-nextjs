import Image from "next/image";
import Mainnav from "../Components/mainnav/page";

export default function Blog() {
  return (
    <>
      <Mainnav />
      <div className="relative w-full h-120">
        <Image
          src="/assets/img/blog-1.jpg"
          alt="Paris"
          fill
          className="object-cover -z-10"
          priority
        />

        {/* your content sits on top */}
        <div className="relative  z-10 flex h-full flex-col p-20 gap-16 text-white">
          <h1 className="text-7xl font-bold">Welcome to BLOG</h1>
          <h2 className="text-xl">
            Meet Natasha, she’s an extremely talented writer who creates great
            content. Our team at Plenty holidays have the privilege to work and
            travel with her to many beautiful destinations and have had some
            great experiences.
          </h2>
        </div>
      </div>
      <div className="m-20">
        <div>
          <h1 className="text-3xl font-extrabold">Featured Blogs</h1>
        </div>
      </div>
    </>
  );
}
