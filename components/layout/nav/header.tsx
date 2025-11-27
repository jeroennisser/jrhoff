"use client";

import React from "react";
import Link from "next/link";
import { Icon } from "../../icon";
import { useLayout } from "../layout-context";
import { Menu, X } from "lucide-react";

export const Header = () => {
  const { globalSettings, theme } = useLayout();
  const header = globalSettings!.header!;

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
            <nav className="hidden lg:block">
              <ul className="flex gap-8 text-sm">
                {header.nav!.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item!.href!}
                      className="text-muted-foreground hover:text-primary transition-colors duration-150">
                      <span>{item!.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

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
                {header.nav!.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item!.href!}
                      onClick={() => setMenuState(false)}
                      className="text-muted-foreground hover:text-primary transition-colors duration-150 block">
                      <span>{item!.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}
