"use client";
import React from "react";
import Link from "next/link";
import { Icon } from "../../icon";
import { useLayout } from "../layout-context";

export const Footer = () => {
  const { globalSettings } = useLayout();
  const { header, footer } = globalSettings!;

  return (
    <footer className="border-t bg-white pt-12 pb-8 dark:bg-transparent">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-sm mb-3">Contact</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Musical 23</p>
              <p>1507 TS Zaandam</p>
              <p>
                <a href="tel:0612261363" className="hover:text-primary">
                  06-12261363
                </a>
              </p>
              <p>
                <a href="mailto:jeroen@bodytherapist.nl" className="hover:text-primary">
                  jeroen@bodytherapist.nl
                </a>
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-sm mb-3">Menu</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {header?.nav?.map((item, index) => (
                <li key={index}>
                  <Link href={item!.href!} className="hover:text-primary">
                    {item!.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Business Info */}
          <div>
            <h3 className="font-semibold text-sm mb-3">Bedrijfsgegevens</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>KvK: 34337856</p>
              <p>Body Therapist & NIS Therapeut</p>
            </div>
          </div>

        </div>

        <div className="pt-6 border-t flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} {header?.name}. Alle rechten voorbehouden.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
