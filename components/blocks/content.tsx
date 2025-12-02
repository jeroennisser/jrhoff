'use client';
import React from 'react';
import Image from 'next/image';

import { TinaMarkdown } from 'tinacms/dist/rich-text';
import type { Template } from 'tinacms';
import { PageBlocksContent } from '../../tina/__generated__/types';
import { tinaField } from 'tinacms/dist/react';
import { Section } from '../layout/section';
import { Mermaid } from './mermaid';
import { sectionBlockSchemaField } from '../layout/section';
import { scriptCopyBlockSchema, ScriptCopyBtn } from '../magicui/script-copy-btn';

export const Content = ({ data }: { data: PageBlocksContent }) => {
  const hasImage = data.image?.src;
  const imagePosition = data.imagePosition || 'right';

  const proseClasses = 'prose prose-lg prose-headings:font-bold prose-headings:tracking-tight prose-h2:text-3xl prose-h2:mt-0 prose-h2:mb-6 prose-h2:text-[var(--page-accent)] prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-gray-700 prose-p:leading-relaxed prose-blockquote:text-center prose-blockquote:not-italic prose-blockquote:font-semibold prose-blockquote:text-2xl prose-blockquote:border-l-0 prose-blockquote:mx-auto prose-blockquote:max-w-3xl prose-blockquote:py-8 prose-blockquote:text-gray-800 prose-em:text-sm prose-em:text-gray-600 prose-hr:my-4 prose-hr:border-gray-300 prose-ol:list-decimal prose-ol:pl-0 prose-li:pl-2 prose-li:mb-4';

  if (hasImage) {
    return (
      <Section background={data.background!}>
        <div className={`max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${imagePosition === 'left' ? 'lg:flex-row-reverse' : ''}`}>
          {imagePosition === 'left' && (
            <div className="relative flex justify-center" data-tina-field={tinaField(data, 'image')}>
              <div className="relative w-full max-w-md aspect-square">
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-2xl shadow-orange-900/10">
                  <Image
                    src={data.image!.src!}
                    alt={data.image!.alt || ''}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          )}
          <div className={proseClasses} data-tina-field={tinaField(data, 'body')}>
            <TinaMarkdown
              content={data.body}
              components={{
                mermaid: (props: any) => <Mermaid {...props} />,
                scriptCopyBlock: (props: any) => <ScriptCopyBtn {...props} />,
              }}
            />
          </div>
          {imagePosition === 'right' && (
            <div className="relative flex justify-center" data-tina-field={tinaField(data, 'image')}>
              <div className="relative w-full max-w-md aspect-square">
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-2xl shadow-orange-900/10">
                  <Image
                    src={data.image!.src!}
                    alt={data.image!.alt || ''}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          )}
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
          mermaid: (props: any) => <Mermaid {...props} />,
          scriptCopyBlock: (props: any) => <ScriptCopyBtn {...props} />,
        }}
      />
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
  ],
};
