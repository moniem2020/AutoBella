'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

import { cn } from '@/lib/utils';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

type NavItem = {
  name: string;
  href?: string;
  isDropdown?: boolean;
  dropdownItems?: Array<{
    title: string;
    href: string;
    description: string;
  }>;
};

const navItems: NavItem[] = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  {
    name: 'Memberships',
    isDropdown: true,
    dropdownItems: [
      { title: 'Client Memberships', href: '/client-memberships', description: 'Exclusive plans for individual car owners.' },
      { title: 'B2B Memberships', href: '/b2b-memberships', description: 'Tailored solutions for your corporate fleet.' },
    ]
  },
  { name: 'About', href: '/about' },
  { name: 'Contact Us', href: '/contact' },
];

const HeaderNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  React.useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
  }, [isMenuOpen]);

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-50 w-full transition-all duration-300',
          'bg-[#1a1a1a]/95 backdrop-blur-md',
          'border-b',
          isScrolled
            ? 'border-[#C9A961]/30 shadow-[0_4px_24px_rgba(0,0,0,0.4)]'
            : 'border-[#C9A961]/10'
        )}
      >
        <div className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-6 md:px-8 lg:px-12">
          <Link href="/" className="flex-shrink-0 transition-opacity hover:opacity-80" onClick={() => setIsMenuOpen(false)}>
            <Image
              src="/autobella-logo-word.png"
              alt="AutoBella"
              width={280}
              height={80}
              className="h-[60px] w-auto md:h-[70px] lg:h-[80px] scale-150 origin-left"
              priority
            />
          </Link>

          <nav className="hidden md:flex">
            <NavigationMenu>
              <NavigationMenuList>
                {navItems.map((item) =>
                  item.isDropdown && item.dropdownItems ? (
                    <NavigationMenuItem key={item.name}>
                      <NavigationMenuTrigger className="bg-transparent text-[15px] font-medium text-white/90 hover:bg-transparent hover:text-[#C9A961] focus:bg-transparent focus:text-[#C9A961] data-[active]:bg-transparent data-[state=open]:bg-transparent data-[state=open]:text-[#C9A961]">
                        {item.name}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 bg-[#1a1a1a]/98 backdrop-blur-md p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] border border-[#C9A961]/20">
                          {item.dropdownItems.map((component) => (
                            <ListItem
                              key={component.title}
                              title={component.title}
                              href={component.href}
                            >
                              {component.description}
                            </ListItem>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  ) : item.href ? (
                    <NavigationMenuItem key={item.name}>
                      <Link href={item.href} passHref>
                        <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "bg-transparent text-[15px] font-medium text-white/90 hover:bg-transparent hover:text-[#C9A961] focus:bg-transparent focus:text-[#C9A961]")}>
                          {item.name}
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                  ) : null
                )}
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white transition-colors hover:text-[#C9A961]"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          'fixed inset-0 top-20 z-40 bg-[#0a0a0a] transition-transform duration-300 ease-in-out md:hidden',
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex h-full flex-col items-center justify-center space-y-8 px-6">
          {navItems.map((item) => (
            <div key={item.name} className="text-center">
              {item.isDropdown && item.dropdownItems ? (
                <>
                  <span className="text-2xl font-semibold text-white/90">{item.name}</span>
                  <div className="mt-3 space-y-3">
                    {item.dropdownItems.map(dropdownItem => (
                      <Link
                        key={dropdownItem.title}
                        href={dropdownItem.href}
                        className="block text-lg text-white/70 transition-colors hover:text-[#C9A961]"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {dropdownItem.title}
                      </Link>
                    ))}
                  </div>
                </>
              ) : item.href ? (
                <Link
                  href={item.href}
                  className="text-2xl font-semibold text-white/90 transition-colors hover:text-[#C9A961]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'> & { title: string }
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#C9A961]/10 hover:text-[#C9A961] focus:bg-[#C9A961]/10 focus:text-[#C9A961]',
            className
          )}
          {...props}
        >
          <div className="text-base font-semibold leading-none text-white">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-white/60">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';

export default HeaderNavigation;