import { ArrowRight, Droplets } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from "@/lib/utils";

const ServicesOverviewSection = () => {
  const goldColor = '#C9A961';
  const darkColor = '#1a1a1a';
  const squareSize = '64px';

  return (
    <section className={cn(
      "relative",
      "bg-[#0a0a0a]"
    )}>
      {/* Checkered border decoration at top */}
      <div
        className="h-16 w-full"
        style={{
          backgroundColor: darkColor,
          backgroundImage: `repeating-conic-gradient(${goldColor} 0% 25%, transparent 0% 50%)`,
          backgroundSize: `${squareSize} ${squareSize}`,
        }}
      />

      {/* Decorative car logo */}
      <div className="absolute bottom-10 left-10 opacity-5 pointer-events-none hidden lg:block">
        <Image
          src="/autobella-logo-car.png"
          alt=""
          width={300}
          height={300}
          className="w-[300px] h-auto"
        />
      </div>

      <div className="mx-auto max-w-[1200px] px-8 py-24 md:px-12 relative z-10">
        <div className="mx-auto max-w-[900px] text-center">
          <h1 className="font-display mb-8 text-[3rem] text-white md:text-[4.5rem]">
            AutoBella Services
          </h1>
          <p
            className="font-body mx-auto max-w-[800px] text-xl text-white/80 mb-16"
            style={{ lineHeight: 1.8 }}
          >
            Enjoy the freedom to choose the perfect car care for you — book a
            single-time wash whenever you need it, or join one of our
            membership packages for regular care. Whether one wash or many,
            we've got you covered.
          </p>

          {/* Car Wash Images - 3 Image Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="relative rounded-2xl overflow-hidden border-2 border-[#C9A961]/30 shadow-[0_0_30px_rgba(201,169,97,0.2)] hover:shadow-[0_0_40px_rgba(201,169,97,0.4)] transition-all duration-300 hover:scale-105">
              <Image
                src="/car-wash-hands.png"
                alt="Professional car washing"
                width={400}
                height={300}
                className="w-full h-64 object-cover"
              />
            </div>

            <div className="relative rounded-2xl overflow-hidden border-2 border-[#C9A961]/30 shadow-[0_0_30px_rgba(201,169,97,0.2)] hover:shadow-[0_0_40px_rgba(201,169,97,0.4)] transition-all duration-300 hover:scale-105">
              <Image
                src="/car-wash-2.jpg"
                alt="Mobile car detailing"
                width={400}
                height={300}
                className="w-full h-64 object-cover"
              />
            </div>

            <div className="relative rounded-2xl overflow-hidden border-2 border-[#C9A961]/30 shadow-[0_0_30px_rgba(201,169,97,0.2)] hover:shadow-[0_0_40px_rgba(201,169,97,0.4)] transition-all duration-300 hover:scale-105">
              <Image
                src="/car-wash-3.jpg"
                alt="Premium car wash service"
                width={400}
                height={300}
                className="w-full h-64 object-cover"
              />
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-center gap-6 md:flex-row">
            <Link
              href="/services"
              className="flex w-full items-center justify-center gap-3 rounded-full border-2 border-[#C9A961] bg-transparent px-10 py-4 text-lg font-semibold text-[#C9A961] transition-all duration-300 hover:bg-[#C9A961] hover:text-black md:w-auto"
            >
              <Droplets className="h-5 w-5" />
              <span>Individual car wash</span>
            </Link>

            <Link
              href="/client-memberships"
              className="flex w-full items-center justify-center gap-3 rounded-full bg-[#C9A961] px-10 py-4 text-lg font-semibold text-black transition-all duration-300 hover:bg-[#b89850] hover:scale-105 md:w-auto"
            >
              <ArrowRight className="h-5 w-5" />
              <span>Memberships</span>
            </Link>

            <Link
              href="/ultimate-care"
              className="flex w-full items-center justify-center gap-3 rounded-full border-2 border-[#C9A961] bg-transparent px-10 py-4 text-lg font-semibold text-[#C9A961] transition-all duration-300 hover:bg-[#C9A961] hover:text-black md:w-auto"
            >
              <Droplets className="h-5 w-5" />
              <span>Ultimate Car Care</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesOverviewSection;