"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Icon } from "../../icon";
import { useLayout } from "../layout-context";
import { Menu, X, LogOut } from "lucide-react";

// Page-specific accent colors
const pageColors: Record<string, string> = {
  '/': '#EB5A3C',           // Orange - Home
  '/nis': '#7D9D7F',         // Green - NIS
  '/about': '#DF9755',       // Warm Orange - About
  '/tarieven': '#6B9BD1',    // Blue - Tarieven
  '/contact': '#C97C8C',     // Pink/Rose - Contact
};

export const Header = () => {
  const { globalSettings, theme } = useLayout();
  const header = globalSettings!.header!;
  const pathname = usePathname();
  const router = useRouter();

  const [menuState, setMenuState] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(true);
  const [lastScrollY, setLastScrollY] = React.useState(0);
  const currentPageColor = pageColors[pathname] || '#EB5A3C';

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Always show on mobile when menu is open
      if (menuState) {
        setIsVisible(true);
        return;
      }
      
      // Show header if at top or scrolling up
      if (currentScrollY < 10 || currentScrollY < lastScrollY) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 10) {
        // Hide when scrolling down and not at top
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleLogout = async () => {
    try {
      await fetch('/api/logout', { method: 'POST' });
      router.push('/login');
      router.refresh();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Set CSS custom property for current page color
  React.useEffect(() => {
    document.documentElement.style.setProperty('--page-accent', currentPageColor);
  }, [currentPageColor]);

  // Force visibility when menu is open
  React.useEffect(() => {
    if (menuState) {
      setIsVisible(true);
    }
  }, [menuState]);

  return (
    <header 
      className={`fixed z-20 w-full px-4 transition-all duration-300 ease-in-out ${
        isVisible ? 'top-0 pt-2' : '-top-24'
      }`}
    >
      <nav className="bg-background/95 backdrop-blur-xl border shadow-lg mx-auto max-w-5xl transition-all duration-500 ease-out rounded-[2rem]">
        <div className="px-6 transition-all duration-300">
          <div className="flex items-center justify-between py-2 lg:py-2">
            {/* Logo */}
            <Link
              href="/"
              aria-label="home"
              className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#EB5A3C]"></div>
              <span className="text-lg font-bold text-black tracking-wide">
                JRHOFF
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-8">
              <nav>
                <ul className="flex gap-8 text-sm">
                  {header.nav!.map((item, index) => {
                    const isActive = pathname === item!.href;
                    const itemColor = pageColors[item!.href!] || '#EB5A3C';
                    return (
                      <li key={index}>
                        <Link
                          href={item!.href!}
                          className={`transition-colors duration-150 pb-1 border-b-2 ${isActive
                            ? 'border-transparent'
                            : 'border-transparent text-muted-foreground hover:opacity-70'
                            }`}
                          style={isActive ? { color: itemColor, borderBottomColor: itemColor } : {}}>
                          <span>{item!.label}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <a
                href="tel:0612261363"
                className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors font-medium">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>06-12261363</span>
              </a>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                aria-label="Uitloggen">
                <LogOut className="w-4 h-4" />
                <span>Uitloggen</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuState(!menuState)}
              aria-label={menuState ? 'Close Menu' : 'Open Menu'}
              className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden">
              <Menu className={`m-auto size-6 transition-all duration-200 ${menuState ? 'rotate-180 scale-0 opacity-0' : ''}`} />
              <X className={`absolute inset-0 m-auto size-6 transition-all duration-200 ${menuState ? 'rotate-0 scale-100 opacity-100' : '-rotate-180 scale-0 opacity-0'}`} />
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          {menuState && (
            <div className="lg:hidden pb-6">
              <ul className="space-y-4 text-base">
                {header.nav!.map((item, index) => {
                  const isActive = pathname === item!.href;
                  const itemColor = pageColors[item!.href!] || '#EB5A3C';
                  return (
                    <li key={index}>
                      <Link
                        href={item!.href!}
                        onClick={() => setMenuState(false)}
                        className={`transition-colors duration-150 block ${isActive
                          ? 'font-semibold'
                          : 'text-muted-foreground hover:opacity-70'
                          }`}
                        style={isActive ? { color: itemColor } : {}}>
                        <span>{item!.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-6 pt-6 border-t">
                <button
                  onClick={() => {
                    setMenuState(false);
                    handleLogout();
                  }}
                  className="flex items-center gap-2 text-base text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Uitloggen">
                  <LogOut className="w-4 h-4" />
                  <span>Uitloggen</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}
