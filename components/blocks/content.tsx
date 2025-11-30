'use client';
import React from 'react';

import { TinaMarkdown } from 'tinacms/dist/rich-text';
import type { Template } from 'tinacms';
import { PageBlocksContent } from '../../tina/__generated__/types';
import { tinaField } from 'tinacms/dist/react';
import { Section } from '../layout/section';
import { Mermaid } from './mermaid';
import { sectionBlockSchemaField } from '../layout/section';
import { scriptCopyBlockSchema, ScriptCopyBtn } from '../magicui/script-copy-btn';

export const Content = ({ data }: { data: PageBlocksContent }) => {
  return (
    <Section
      background={data.background!}
      className='prose prose-lg max-w-4xl prose-headings:font-bold prose-headings:tracking-tight prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:text-[var(--page-accent)] prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-gray-700 prose-p:leading-relaxed prose-blockquote:text-center prose-blockquote:not-italic prose-blockquote:font-semibold prose-blockquote:text-2xl prose-blockquote:border-l-0 prose-blockquote:mx-auto prose-blockquote:max-w-3xl prose-blockquote:py-8 prose-blockquote:text-gray-800 prose-em:text-sm prose-em:text-gray-600 prose-hr:my-4 prose-hr:border-gray-300'
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
  ],
};
