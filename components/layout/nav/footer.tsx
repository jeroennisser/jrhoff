"use client";
import React from "react";
import Link from "next/link";
import { Icon } from "../../icon";
import { useLayout } from "../layout-context";

export const Footer = () => {
  const { globalSettings } = useLayout();
  const { header, footer } = globalSettings!;

  return (
    <footer className="bg-[#2D2926] text-white pt-12 pb-8">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-sm mb-3 text-white">Contact</h3>
            <div className="text-sm text-white/70">
              <div className="mb-4">
                <span className="text-white font-medium text-xs block">Zaandam</span>
                <span className="block">Musical 23, 1507 TS</span>
              </div>
              <div className="mb-4">
                <span className="text-white font-medium text-xs block">Dordrecht</span>
                <span className="block">Sint Jorisweg 48, 3311 PL</span>
              </div>
              <div>
                <a href="tel:0612261363" className="block hover:text-[var(--page-accent)] transition-colors">
                  06-12261363
                </a>
                <a href="mailto:jeroen@bodytherapist.nl" className="block hover:text-[var(--page-accent)] transition-colors">
                  jeroen@bodytherapist.nl
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-sm mb-3 text-white">Menu</h3>
            <ul className="space-y-2 text-sm text-white/70">
              {header?.nav?.map((item, index) => (
                <li key={index}>
                  <Link href={item!.href!} className="hover:text-[var(--page-accent)] transition-colors">
                    {item!.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Business Info */}
          <div>
            <h3 className="font-semibold text-sm mb-3 text-white">Bedrijfsgegevens</h3>
            <div className="space-y-2 text-sm text-white/70">
              <p>KvK: 34337856</p>
              <p>Body Therapist & NIS Therapeut</p>
            </div>
          </div>

        </div>

        <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-white/50 text-sm">
              © {new Date().getFullYear()} {header?.name}. Alle rechten voorbehouden.
            </span>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <Link href="/privacy" className="text-white/70 hover:text-[var(--page-accent)] transition-colors">
              Privacy Statement
            </Link>
            <span className="text-white/30">|</span>
            <Link href="/algemene-voorwaarden" className="text-white/70 hover:text-[var(--page-accent)] transition-colors">
              Algemene Voorwaarden
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
