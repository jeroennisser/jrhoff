'use client';
import React from 'react';
import Image from 'next/image';
import type { Template } from 'tinacms';
import { PageBlocksPartnership } from '../../tina/__generated__/types';
import { tinaField } from 'tinacms/dist/react';
import { Section } from '../layout/section';
import { sectionBlockSchemaField } from '../layout/section';

export const Partnership = ({ data, priority = false }: { data: PageBlocksPartnership; priority?: boolean }) => {
  const imagePosition = data.imagePosition || 'right';

  return (
    <Section background={data.background!}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        {/* Image with breathing circle */}
        <div
          className={`relative flex justify-center mx-auto lg:mx-0 max-w-md lg:max-w-none mb-8 lg:mb-0 ${imagePosition === 'right' ? 'order-first lg:order-last' : ''}`}
          data-tina-field={tinaField(data, 'image')}
        >
          <div className="relative breathing-circle w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96">
            <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-2xl shadow-orange-900/10">
              <Image
                src={data.image?.src || ''}
                alt={data.image?.alt || ''}
                fill
                className="object-cover"
                priority={priority}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
              />
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div className="mx-auto lg:mx-0 max-w-2xl">
          {data.title && (
            <h2
              className="text-3xl md:text-4xl font-bold tracking-tight mb-6"
              style={{ color: 'var(--page-accent)' }}
              data-tina-field={tinaField(data, 'title')}
            >
              {data.title}
            </h2>
          )}
          {data.description && (
            <div
              className="text-lg text-gray-700 leading-relaxed"
              data-tina-field={tinaField(data, 'description')}
            >
              <p>{data.description}</p>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
};

export const partnershipBlockSchema: Template = {
  name: 'partnership',
  label: 'Partnership',
  ui: {
    previewSrc: '/blocks/partnership.png',
    defaultItem: {
      title: 'Samenwerking',
      description: 'Wij werken samen aan complementaire zaken om onze cliënten de beste zorg te bieden.',
    },
  },
  fields: [
    sectionBlockSchemaField as any,
    {
      type: 'string',
      label: 'Title',
      name: 'title',
    },
    {
      type: 'string',
      label: 'Description',
      name: 'description',
      ui: {
        component: 'textarea',
      },
    },
    {
      type: 'object',
      label: 'Image',
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
