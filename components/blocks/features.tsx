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
  return (
    <Section background={data.background!}>
      <div className="mx-auto">
        <div className="text-center">
          <h2 data-tina-field={tinaField(data, 'title')} className="text-balance text-4xl font-semibold lg:text-5xl">{data.title}</h2>
          <p data-tina-field={tinaField(data, 'description')} className="mt-4">{data.description}</p>
        </div>
        <div className="mx-auto mt-8 grid gap-8 md:mt-16 md:grid-cols-2 lg:grid-cols-3">
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
  <div className="relative mx-auto size-36 duration-200 [--color-border:color-mix(in_oklab,var(--color-zinc-950)10%,transparent)] group-hover:[--color-border:color-mix(in_oklab,var(--color-zinc-950)20%,transparent)] dark:[--color-border:color-mix(in_oklab,var(--color-white)15%,transparent)] dark:group-hover:bg-white/5 dark:group-hover:[--color-border:color-mix(in_oklab,var(--color-white)20%,transparent)]">
    <div aria-hidden className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:24px_24px]" />
    <div aria-hidden className="bg-radial to-background absolute inset-0 from-transparent to-75%" />
    <div className="bg-background absolute inset-0 m-auto flex size-12 items-center justify-center border-l border-t">{children}</div>
  </div>
)

export const Feature: React.FC<PageBlocksFeaturesItems> = (data) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();

  // Convert rich text to plain text for length checking
  const getPlainText = (content: any): string => {
    if (!content) return '';
    if (typeof content === 'string') return content;

    let text = '';
    const extract = (item: any): void => {
      if (!item) return;

      if (typeof item === 'string') {
        text += item;
        return;
      }

      if (Array.isArray(item)) {
        item.forEach(extract);
        return;
      }

      if (item.text) {
        text += item.text;
      }

      if (item.children) {
        extract(item.children);
      }
    };

    extract(content);
    return text;
  };

  const plainText = getPlainText(data.text);
  const MAX_LENGTH = 150;
  const shouldTruncate = plainText.length > MAX_LENGTH;
  const truncatedText = shouldTruncate ? plainText.substring(0, MAX_LENGTH) + '...' : plainText;
  const hasLink = !!(data as any).link;

  const handleCardClick = () => {
    if (hasLink) {
      router.push((data as any).link);
    }
  };

  return (
    <Card
      className={`group text-center shadow-zinc-950/5 ${hasLink ? 'cursor-pointer hover:shadow-md transition-shadow' : ''}`}
      onClick={handleCardClick}
    >
      <CardHeader className="pb-3">
        <CardDecorator>
          {data.icon && (
            <Icon
              tinaField={tinaField(data, "icon")}
              data={{ size: "large", ...data.icon }}
            />
          )}
        </CardDecorator>

        <h3
          data-tina-field={tinaField(data, "title")}
          className="mt-6"
        >
          {data.title}
        </h3>
      </CardHeader>

      <CardContent className="text-sm pb-8">
        <div data-tina-field={tinaField(data, "text")}>
          {isExpanded || !shouldTruncate ? (
            <TinaMarkdown content={data.text} />
          ) : (
            <div>{truncatedText}</div>
          )}
        </div>

        {shouldTruncate && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            className="mt-4 inline-flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors font-medium cursor-pointer"
            aria-label={isExpanded ? "Lees minder" : "Lees meer"}
          >
            {isExpanded ? (
              <>
                Lees minder
                <ChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                Lees meer
                <ChevronDown className="w-4 h-4" />
              </>
            )}
          </button>
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
      ],
    },
  ],
};
