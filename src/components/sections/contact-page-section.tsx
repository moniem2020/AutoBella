"use client";

import { Phone, Mail, MapPin, Facebook, Instagram, ChevronDown } from 'lucide-react';
import { useState, FormEvent, FC, ReactNode } from 'react';
import Image from 'next/image';

interface InputProps {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}

const CustomInput: FC<InputProps> = ({ id, label, type = 'text', placeholder, required = false }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-white/80 mb-2">
      {label}
    </label>
    <input
      id={id}
      name={id}
      type={type}
      placeholder={placeholder}
      required={required}
      className="w-full text-base bg-white/5 border border-[#C9A961]/20 rounded-md p-3.5 text-white focus:border-[#C9A961] focus:ring-1 focus:ring-[#C9A961] focus:outline-none transition-colors duration-200 placeholder:text-white/30"
    />
  </div>
);

interface TextareaProps {
  id: string;
  label: string;
  placeholder?: string;
  required?: boolean;
}

const CustomTextarea: FC<TextareaProps> = ({ id, label, placeholder, required = false }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-white/80 mb-2">
      {label}
    </label>
    <textarea
      id={id}
      name={id}
      placeholder={placeholder}
      required={required}
      className="w-full text-base bg-white/5 border border-[#C9A961]/20 rounded-md p-3.5 h-[150px] resize-none text-white focus:border-[#C9A961] focus:ring-1 focus:ring-[#C9A961] focus:outline-none transition-colors duration-200 placeholder:text-white/30"
    />
  </div>
);

interface SelectProps {
  id: string;
  label: string;
  children: ReactNode;
}

const CustomSelect: FC<SelectProps> = ({ id, label, children }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-white/80 mb-2">
      {label}
    </label>
    <div className="relative">
      <select
        id={id}
        name={id}
        className="w-full text-base bg-white/5 border border-[#C9A961]/20 rounded-md p-3.5 appearance-none text-white focus:border-[#C9A961] focus:ring-1 focus:ring-[#C9A961] focus:outline-none transition-colors duration-200"
      >
        {children}
      </select>
      <ChevronDown className="absolute top-1/2 right-4 -translate-y-1/2 h-5 w-5 text-white/50 pointer-events-none" />
    </div>
  </div>
);


const ContactPageSection = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    // Mock submission for demonstration
    await new Promise(resolve => setTimeout(resolve, 1500));
    // You would replace this with your actual form submission logic
    // For demonstration, we'll randomly set success or error
    Math.random() > 0.3 ? setStatus('success') : setStatus('error');
  };

  return (
    <section
      className="relative bg-black font-body overflow-hidden"
    >
      {/* Decorative car logo */}
      <div className="absolute top-0 right-0 opacity-5 pointer-events-none">
        <Image
          src="/autobella-logo-car.png"
          alt=""
          width={600}
          height={600}
          className="w-[600px] h-auto"
        />
      </div>

      <div className="mx-auto max-w-[1200px] py-20 px-12 lg:px-3 relative z-10">
        <header className="text-center mb-16">
          <h1 className="font-display text-[#C9A961] text-[4.5rem] leading-none mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-white/70">
            We're here to help
          </p>
        </header>

        <div className="flex flex-col lg:flex-row lg:gap-12">

          {/* Left Side: Contact Form (55%) */}
          <div className="w-full lg:w-[55%]">
            <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-sm p-12 rounded-[16px] border border-[#C9A961]/20 shadow-[0_8px_24px_rgba(0,0,0,0.3)] space-y-6">
              <CustomInput id="name" label="Name" required />
              <CustomInput id="email" label="Email" type="email" required />
              <CustomInput id="phone" label="Phone" type="tel" />
              <CustomSelect id="service_interest" label="Service Interest">
                <option className="bg-black text-white">Individual Wash</option>
                <option className="bg-black text-white">Client Membership</option>
                <option className="bg-black text-white">B2B</option>
              </CustomSelect>
              <CustomTextarea id="message" label="Message" required />

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full bg-[#C9A961] hover:bg-[#b89850] text-black text-base font-semibold py-4 rounded-full transition-all duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed shadow-lg hover:scale-[1.02]"
              >
                {status === 'submitting' ? 'Sending...' : 'Send Message'}
              </button>
              {status === 'success' && <p className="text-green-500 text-center mt-4">Message sent successfully! We'll be in touch soon.</p>}
              {status === 'error' && <p className="text-red-500 text-center mt-4">An error occurred. Please try again.</p>}
            </form>
          </div>

          {/* Right Side: Contact Info (45%) */}
          <div className="w-full lg:w-[45%] mt-12 lg:mt-0">
            <div className="space-y-4">
              <a href="tel:+201556028198" className="bg-white/5 p-6 rounded-lg flex items-center gap-4 border border-[#C9A961]/20 hover:bg-white/10 hover:border-[#C9A961]/40 transition-all duration-300">
                <Phone className="h-6 w-6 text-[#C9A961]" />
                <span className="text-white">01556028198</span>
              </a>
              <div className="bg-white/5 p-6 rounded-lg flex items-center gap-4 border border-[#C9A961]/20">
                <MapPin className="h-6 w-6 text-[#C9A961]" />
                <span className="text-white">Cairo, Egypt</span>
              </div>
            </div>



            {/* Social Links */}
            <div className="mt-8 text-center">
              <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
              <div className="flex justify-center gap-6">
                <a href="#" aria-label="Facebook" className="text-white/60 hover:text-[#C9A961] transition-colors hover:scale-110 transform duration-200">
                  <Facebook className="h-7 w-7" />
                </a>
                <a href="#" aria-label="Instagram" className="text-white/60 hover:text-[#C9A961] transition-colors hover:scale-110 transform duration-200">
                  <Instagram className="h-7 w-7" />
                </a>
                <a href="https://wa.me/201556028198?text=I%20have%20an%20inquiry" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="text-white/60 hover:text-[#C9A961] transition-colors hover:scale-110 transform duration-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-7 w-7"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPageSection;