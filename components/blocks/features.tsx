"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  PageBlocksFeatures,
  PageBlocksFeaturesItems,
} from "../../tina/__generated__/types";
import type { Template } from 'tinacms';
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { Icon } from "../icon";
import { iconSchema } from "../../tina/fields/icon";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Section } from "../layout/section";
import { sectionBlockSchemaField } from '../layout/section';
import { ChevronDown, ChevronUp } from "lucide-react";

export const Features = ({ data }: { data: PageBlocksFeatures }) => {
  const itemCount = data.items?.length || 0;
  const gridCols = itemCount === 3 ? 'lg:grid-cols-3' : itemCount === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3';

  return (
    <Section background={data.background!}>
      <div className="mx-auto max-w-7xl">
        <div className="text-center mx-auto">
          <h2 data-tina-field={tinaField(data, 'title')} className="text-balance text-3xl md:text-4xl font-bold tracking-tight" style={{ color: 'var(--page-accent)' }}>{data.title}</h2>
          <p data-tina-field={tinaField(data, 'description')} className="mt-3 text-base md:text-lg text-gray-600 font-normal max-w-3xl mx-auto">{data.description}</p>
        </div>
        <div className={`mx-auto mt-12 grid gap-6 md:grid-cols-2 ${gridCols} max-w-6xl`}>
          {data.items &&
            data.items.map(function (block, i) {
              return <Feature key={i} {...block!} />;
            })}
        </div>
      </div>
    </Section>
  )
}

const CardDecorator = ({ children }: { children: React.ReactNode }) => (
  <div className="relative mx-auto flex items-center justify-center">
    {children}
  </div>
)

export const Feature: React.FC<PageBlocksFeaturesItems> = (data) => {
  const router = useRouter();
  const hasLink = !!(data as any).link;

  const handleCardClick = () => {
    if (hasLink) {
      router.push((data as any).link);
    }
  };

  return (
    <Card
      className="group text-center shadow-sm border-accent-100 bg-white/60 backdrop-blur-sm rounded-xl h-full flex flex-col"
    >
      <CardHeader className="pb-4">
        <CardDecorator>
          {data.icon && (
            <Icon
              tinaField={tinaField(data, "icon")}
              data={{ size: "large", ...data.icon, color: 'accent' }}
            />
          )}
        </CardDecorator>

        <div data-tina-field={tinaField(data, "title")}>
          <h3 className="mt-6 font-semibold text-sm">
            {data.title}
          </h3>
        </div>
      </CardHeader>

      <CardContent className="text-sm pb-6 flex-grow flex flex-col">
        <div data-tina-field={tinaField(data, "text")} className="text-gray-600 flex-grow leading-relaxed mb-6">
          <div className="leading-relaxed">
            <TinaMarkdown content={data.text} />
          </div>
        </div>

        {hasLink && (
          <div className="mt-auto pt-4">
            <button
              onClick={handleCardClick}
              className="inline-flex items-center justify-center px-6 py-2 text-sm font-medium text-white transition-colors rounded-full hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer"
              style={{
                backgroundColor: 'var(--page-accent)',
                '--tw-ring-color': 'var(--page-accent)'
              } as React.CSSProperties}
            >
              {(data as any).buttonText || 'Ga verder'}
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const defaultFeature = {
  title: "Here's Another Feature",
  text: "This is where you might talk about the feature, if this wasn't just filler text.",
  icon: {
    name: "Tina",
    color: "white",
    style: "float",
  }
};

export const featureBlockSchema: Template = {
  name: "features",
  label: "Features",
  ui: {
    previewSrc: "/blocks/features.png",
    defaultItem: {
      title: 'Built to cover your needs',
      description: 'We have a lot of features to cover your needs',
      items: [defaultFeature, defaultFeature, defaultFeature],
    },
  },
  fields: [
    sectionBlockSchemaField as any,
    {
      type: "string",
      label: "Title",
      name: "title",
    },
    {
      type: "string",
      label: "Description",
      name: "description",
    },
    {
      type: "object",
      label: "Feature Items",
      name: "items",
      list: true,
      ui: {
        itemProps: (item) => {
          return {
            label: item?.title,
          };
        },
        defaultItem: {
          ...defaultFeature,
        },
      },
      fields: [
        iconSchema as any,
        {
          type: "string",
          label: "Title",
          name: "title",
        },
        {
          type: "rich-text",
          label: "Text",
          name: "text",
        },
        {
          type: "string",
          label: "Link (optional)",
          name: "link",
          description: "Internal link (e.g., /nis, /about) or external URL",
        },
        {
          type: "string",
          label: "Button Text",
          name: "buttonText",
          description: "Text for the button (default: Ga verder)",
        },
      ],
    },
  ],
};
