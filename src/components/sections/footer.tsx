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
                            <a
                                href="https://wa.me/201556028198?text=I%20have%20an%20inquiry"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white/80 hover:text-[#C9A961] transition-all duration-200 hover:scale-110"
                                aria-label="WhatsApp"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                </svg>
                            </a>
                            <a
                                href="https://www.tiktok.com/@autobella_carwash"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white/80 hover:text-[#C9A961] transition-all duration-200 hover:scale-110"
                                aria-label="TikTok"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                                </svg>
                            </a>
                        </div>

                        {/* Feedback Links */}
                        <div className="mt-6 space-y-2">
                            <Link
                                href="/service-evaluation"
                                className="block text-sm text-white/60 hover:text-[#C9A961] transition-colors"
                            >
                                Service Evaluation / تقييم الخدمه
                            </Link>
                            <a
                                href="https://wa.me/201556028198?text=I%20have%20a%20suggestion/complaint%20-%20لدي%20مقترح/شكوى"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block text-sm text-white/60 hover:text-[#C9A961] transition-colors"
                            >
                                Suggestions & Complaints / مقترحات و شكاوي
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
                            <li><Link href="/ultimate-care" className="text-white/70 hover:text-[#C9A961] transition-colors text-base">Ultimate Car Care</Link></li>
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