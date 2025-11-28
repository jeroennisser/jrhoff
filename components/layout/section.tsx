import React, { ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface SectionProps extends React.HTMLProps<HTMLElement> {
  background?: string;
  children: ReactNode;
}

export const Section: React.FC<SectionProps> = ({ className, children, background, ...props }) => {
  return (
    <div className={cn("w-full", background || "bg-default")}>
      <section
        className={cn("py-12 mx-auto max-w-5xl px-6", className)}
        {...props}
      >
        {children}
      </section>
    </div>
  );
};

export const tailwindBackgroundOptions = [
  { label: "Default", value: "bg-default" },
  { label: "None", value: "" },
  { label: "Primary", value: "bg-primary" },
  { label: "Secondary", value: "bg-secondary" },
  { label: "White", value: "bg-white" },

  // New accent-based backgrounds
  { label: "🎨 Gradient Subtle", value: "bg-gradient-subtle" },
  { label: "🎨 Gradient Accent", value: "bg-gradient-accent" },
  { label: "🎨 Dots Pattern", value: "bg-dots-accent" },
  { label: "🎨 Grid Pattern", value: "bg-grid-accent" },
  { label: "🎨 Radial Accent", value: "bg-radial-accent" },
  { label: "🎨 Stripes Pattern", value: "bg-stripes-accent" },
  { label: "🎨 Gradient + Dots", value: "bg-gradient-dots" },
  { label: "🎨 Secondary Accent", value: "bg-secondary-accent" },
  { label: "🎨 Mesh Gradient", value: "bg-mesh-accent" },
  { label: "🎨 Floating Circles", value: "bg-circles-accent" },
  { label: "🎨 Blurry Blobs", value: "bg-blobs-accent" },
  { label: "🎨 Soft Orbs", value: "bg-orbs-accent" },
  { label: "🎨 Gradient Circles", value: "bg-gradient-circles" },
  { label: "🎨 Wave Pattern", value: "bg-waves-accent" },
  { label: "🎨 Scattered Circles", value: "bg-scatter-circles" },


  // Original colors
  { label: "Gray", value: "bg-gray-50" },
  { label: "Zinc", value: "bg-zinc-50" },
  { label: "Black", value: "bg-black" },
  { label: "Red", value: "bg-red-50" },
  { label: "Orange", value: "bg-orange-50" },
  { label: "Yellow", value: "bg-yellow-50" },
  { label: "Green", value: "bg-green-50" },
  { label: "Lime", value: "bg-lime-50" },
  { label: "Emerald", value: "bg-emerald-50" },
  { label: "Teal", value: "bg-teal-50" },
  { label: "Cyan", value: "bg-cyan-50" },
  { label: "Blue", value: "bg-blue-50" },
  { label: "Sky", value: "bg-sky-50" },
  { label: "Indigo", value: "bg-indigo-50" },
  { label: "Violet", value: "bg-violet-50" },
  { label: "Purple", value: "bg-purple-50" },
  { label: "Fuchsia", value: "bg-fuchsia-50" },
  { label: "Pink", value: "bg-pink-50" },
  { label: "Rose", value: "bg-rose-50" },
];

export const sectionBlockSchemaField = {
  type: "string",
  label: "Background",
  name: "background",
  options: tailwindBackgroundOptions,
};