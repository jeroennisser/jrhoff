"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "../../icon";
import { useLayout } from "../layout-context";
import { Menu, X } from "lucide-react";

export const Header = () => {
  const { globalSettings, theme } = useLayout();
  const header = globalSettings!.header!;
  const pathname = usePathname();

  const [menuState, setMenuState] = React.useState(false)
  return (
    <header>
      <nav className="bg-background/50 fixed z-20 w-full border-b backdrop-blur-3xl">
        <div className="mx-auto max-w-full px-6 lg:px-12 transition-all duration-300">
          <div className="flex items-center justify-between py-3 lg:py-4">
            {/* Logo */}
            <Link
              href="/"
              aria-label="home"
              className="flex items-center space-x-2">
              <Icon
                parentColor={header.color!}
                data={{
                  name: header.icon!.name,
                  color: header.icon!.color,
                  style: header.icon!.style,
                }}
              />{" "}
              <span>
                {header.name}
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-8">
              <nav>
                <ul className="flex gap-8 text-sm">
                  {header.nav!.map((item, index) => {
                    const isActive = pathname === item!.href;
                    return (
                      <li key={index}>
                        <Link
                          href={item!.href!}
                          className={`text-muted-foreground hover:text-primary transition-colors duration-150 pb-1 border-b-2 ${
                            isActive
                              ? 'border-primary text-primary'
                              : 'border-transparent'
                          }`}>
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
                  return (
                    <li key={index}>
                      <Link
                        href={item!.href!}
                        onClick={() => setMenuState(false)}
                        className={`transition-colors duration-150 block ${
                          isActive
                            ? 'text-primary font-semibold'
                            : 'text-muted-foreground hover:text-primary'
                        }`}>
                        <span>{item!.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}
