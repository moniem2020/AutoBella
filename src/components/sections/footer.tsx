import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Instagram } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-black text-white font-body relative overflow-hidden">
            {/* Decorative car logo */}
            <div className="absolute top-10 right-10 opacity-5 pointer-events-none hidden lg:block">
                <Image
                    src="/autobella-logo-car.png"
                    alt=""
                    width={300}
                    height={300}
                    className="w-[300px] h-auto"
                />
            </div>

            <div className="max-w-[1400px] mx-auto px-8 md:px-16 pt-20 pb-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.5fr] gap-12 text-center md:text-left">

                    {/* Column 1: Logo, Social, Copyright */}
                    <div className="flex flex-col items-center md:items-start">
                        <Link href="/" className="mb-6 transition-opacity hover:opacity-80">
                            <Image
                                src="/autobella-logo-word.png"
                                alt="AutoBella"
                                width={180}
                                height={60}
                                className="w-[180px] h-auto"
                            />
                        </Link>
                        <div className="flex gap-5 mt-6">
                            <a
                                href="https://www.facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white/80 hover:text-[#C9A961] transition-all duration-200 hover:scale-110"
                                aria-label="Facebook"
                            >
                                <Facebook size={24} />
                            </a>
                            <a
                                href="https://www.instagram.com/autobella_carwash/?igsh=MWlzMTF0ZXJydXczcQ%3D%3D#"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white/80 hover:text-[#C9A961] transition-all duration-200 hover:scale-110"
                                aria-label="Instagram"
                            >
                                <Instagram size={24} />
                            </a>
                        </div>
                        <p className="mt-8 text-sm text-white/50">
                            © 2025 AutoBella. All rights reserved.
                        </p>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold text-[#C9A961] mb-6">Quick Links</h3>
                        <ul className="space-y-3">
                            <li><Link href="/" className="text-white/70 hover:text-[#C9A961] transition-colors text-base">Home</Link></li>
                            <li><Link href="/services" className="text-white/70 hover:text-[#C9A961] transition-colors text-base">Services</Link></li>
                            <li><Link href="/about" className="text-white/70 hover:text-[#C9A961] transition-colors text-base">About Us</Link></li>
                            <li><Link href="/client-memberships" className="text-white/70 hover:text-[#C9A961] transition-colors text-base">Memberships</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Support */}
                    <div>
                        <h3 className="text-lg font-semibold text-[#C9A961] mb-6">Support</h3>
                        <ul className="space-y-3">
                            <li><Link href="/#faqs" className="text-white/70 hover:text-[#C9A961] transition-colors text-base">FAQs</Link></li>
                            <li><Link href="/#book" className="text-white/70 hover:text-[#C9A961] transition-colors text-base">Book a Wash</Link></li>
                        </ul>
                    </div>

                    {/* Column 4: Contact Us */}
                    <div>
                        <h3 className="text-lg font-semibold text-[#C9A961] mb-6">Contact Us</h3>
                        <div className="text-white/70 space-y-3 text-base">
                            <p>
                                Phone: <a href="tel:+201556028198" className="hover:text-[#C9A961] transition-colors">015 560 28198</a>
                            </p>
                            <p>
                                Location: Cairo, Egypt
                            </p>
                            <p>
                                Email: autobella.cars@gmail.com
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;