'use client';
import React from 'react';
import Image from 'next/image';

import { TinaMarkdown } from 'tinacms/dist/rich-text';
import type { Template } from 'tinacms';
import { PageBlocksContent } from '../../tina/__generated__/types';
import { tinaField } from 'tinacms/dist/react';
import { Section } from '../layout/section';
import { sectionBlockSchemaField } from '../layout/section';
import { scriptCopyBlockSchema, ScriptCopyBtn } from '../magicui/script-copy-btn';

import Link from 'next/link';
import { iconSchema } from '@/tina/fields/icon';
import { Button } from '@/components/ui/button';
import { Icon } from '../icon';

const isExternalLink = (url: string) => {
  return url.startsWith('http://') || url.startsWith('https://') || url.startsWith('tel:') || url.startsWith('mailto:');
};

export const Content = ({ data, priority = false }: { data: PageBlocksContent; priority?: boolean }) => {
  const hasImage = data.image?.src;
  const imagePosition = data.imagePosition || 'right';

  const proseClasses = 'prose prose-lg prose-headings:font-bold prose-headings:tracking-tight prose-h2:text-3xl prose-h2:mt-0 prose-h2:mb-6 prose-h2:text-[var(--page-accent)] prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-gray-700 prose-p:leading-relaxed prose-blockquote:text-center prose-blockquote:not-italic prose-blockquote:font-semibold prose-blockquote:text-2xl prose-blockquote:border-l-0 prose-blockquote:mx-auto prose-blockquote:max-w-3xl prose-blockquote:py-8 prose-blockquote:text-gray-800 prose-em:text-sm prose-em:text-gray-600 prose-hr:my-4 prose-hr:border-gray-300 prose-ol:list-decimal prose-ol:pl-0 prose-li:pl-2 prose-li:mb-4';

  const Actions = () => {
    if (!data.actions || data.actions.length === 0) return null;
    return (
      <div className="mt-8 flex flex-wrap gap-4">
        {data.actions.map((action) => {
          const linkUrl = action!.link!;
          const isExternal = isExternalLink(linkUrl);
          return (
            <div key={action!.label} data-tina-field={tinaField(action)}>
              <Button
                asChild
                size="lg"
                variant={action!.type === 'link' ? 'outline' : 'default'}
                className={`px-7 py-3 text-base rounded-full transition-all duration-150 ease-out hover:scale-[1.02] ${action!.type === 'link' ? 'bg-white hover:bg-orange-50 text-gray-900 border-[1.5px] border-gray-300' : 'bg-[var(--page-accent)] text-white hover:opacity-90'}`}
              >
                {isExternal ? (
                  <a href={linkUrl} target={linkUrl.startsWith('http') ? '_blank' : undefined} rel={linkUrl.startsWith('http') ? 'noopener noreferrer' : undefined}>
                    {action?.icon && <Icon data={action?.icon} />}
                    <span className="text-nowrap">{action!.label}</span>
                  </a>
                ) : (
                  <Link href={linkUrl}>
                    {action?.icon && <Icon data={action?.icon} />}
                    <span className="text-nowrap">{action!.label}</span>
                  </Link>
                )}
              </Button>
            </div>
          );
        })}
      </div>
    );
  };

  if (hasImage) {
    const ImageComponent = () => (
      <div className="relative flex justify-center" data-tina-field={tinaField(data, 'image')}>
        <div className="relative breathing-circle w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96">
          <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-2xl shadow-orange-900/10">
            <Image
              src={data.image!.src!}
              alt={data.image!.alt || ''}
              fill
              className="object-cover"
              priority={priority}
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
            />
          </div>
        </div>
      </div>
    );

    const TextComponent = () => (
      <div className={proseClasses} data-tina-field={tinaField(data, 'body')}>
        <TinaMarkdown
          content={data.body}
          components={{
            scriptCopyBlock: (props: any) => <ScriptCopyBtn {...props} />,
          }}
        />
        <Actions />
      </div>
    );

    return (
      <Section background={data.background!}>
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${imagePosition === 'left' ? 'lg:flex-row-reverse' : ''}`}>
          {/* On mobile, always show image first; on desktop, respect imagePosition */}
          <div className={`mx-auto lg:mx-0 max-w-md lg:max-w-none mb-8 lg:mb-0 ${imagePosition === 'right' ? 'order-first lg:order-last' : ''}`}>
            <ImageComponent />
          </div>
          <div className="mx-auto lg:mx-0 max-w-2xl lg:max-w-none">
            <TextComponent />
          </div>
        </div>
      </Section>
    );
  }

  return (
    <Section
      background={data.background!}
      className={`${proseClasses} max-w-4xl`}
      data-tina-field={tinaField(data, 'body')}
    >
      <TinaMarkdown
        content={data.body}
        components={{
          scriptCopyBlock: (props: any) => <ScriptCopyBtn {...props} />,
        }}
      />
      <Actions />
    </Section>
  );
};

export const contentBlockSchema: Template = {
  name: 'content',
  label: 'Content',
  ui: {
    previewSrc: '/blocks/content.png',
    defaultItem: {
      body: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.',
    },
  },
  fields: [
    sectionBlockSchemaField as any,
    {
      type: 'rich-text',
      label: 'Body',
      name: 'body',
      templates: [scriptCopyBlockSchema],
    },
    {
      type: 'object',
      label: 'Image (optional - creates two-column layout)',
      name: 'image',
      fields: [
        {
          type: 'image',
          label: 'Image Source',
          name: 'src',
        },
        {
          type: 'string',
          label: 'Alt Text',
          name: 'alt',
        },
      ],
    },
    {
      type: 'string',
      label: 'Image Position',
      name: 'imagePosition',
      options: [
        { value: 'left', label: 'Left' },
        { value: 'right', label: 'Right' },
      ],
    },
    {
      label: 'Actions',
      name: 'actions',
      type: 'object',
      list: true,
      ui: {
        defaultItem: {
          label: 'Action Label',
          type: 'button',
          icon: {
            name: 'Tina',
            color: 'white',
            style: 'float',
          },
          link: '/',
        },
        itemProps: (item) => ({ label: item.label }),
      },
      fields: [
        {
          label: 'Label',
          name: 'label',
          type: 'string',
        },
        {
          label: 'Type',
          name: 'type',
          type: 'string',
          options: [
            { label: 'Button', value: 'button' },
            { label: 'Link', value: 'link' },
          ],
        },
        iconSchema as any,
        {
          label: 'Link',
          name: 'link',
          type: 'string',
        },
      ],
    },
  ],
};
