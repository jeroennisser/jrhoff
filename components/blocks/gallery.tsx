'use client';
import React from 'react';
import type { Template } from 'tinacms';
import { PageBlocksGallery } from '../../tina/__generated__/types';
import { tinaField } from 'tinacms/dist/react';
import { Section } from '../layout/section';
import { sectionBlockSchemaField } from '../layout/section';
import Image from 'next/image';

export const Gallery = ({ data }: { data: PageBlocksGallery }) => {
  if (!data.images || data.images.length === 0) {
    return null;
  }

  const columns = data.columns || 3;
  const gridClass =
    columns === 2 ? 'grid-cols-1 md:grid-cols-2' :
    columns === 4 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4' :
    'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';

  return (
    <Section background={data.background!}>
      {data.title && (
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold" data-tina-field={tinaField(data, 'title')}>
            {data.title}
          </h2>
          {data.description && (
            <p className="mt-4 text-lg text-muted-foreground" data-tina-field={tinaField(data, 'description')}>
              {data.description}
            </p>
          )}
        </div>
      )}
      <div className={`grid ${gridClass} gap-6`}>
        {data.images.map((image: any, index: number) => (
          <div
            key={index}
            className="relative aspect-video overflow-hidden rounded-lg border border-border/25"
            data-tina-field={tinaField(image)}
          >
            <Image
              src={image.src || ''}
              alt={image.alt || ''}
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {image.caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-2 text-sm">
                {image.caption}
              </div>
            )}
          </div>
        ))}
      </div>
    </Section>
  );
};

export const galleryBlockSchema: Template = {
  name: 'gallery',
  label: 'Image Gallery',
  ui: {
    previewSrc: '/blocks/gallery.png',
    defaultItem: {
      title: 'Galerij',
      columns: 3,
      images: [],
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
      type: 'number',
      label: 'Columns',
      name: 'columns',
      description: 'Number of columns in the gallery (2, 3, or 4)',
      ui: {
        min: 2,
        max: 4,
      },
    },
    {
      type: 'object',
      label: 'Images',
      name: 'images',
      list: true,
      ui: {
        itemProps: (item: any) => ({
          label: item?.alt || 'Image',
        }),
      },
      fields: [
        {
          type: 'image',
          label: 'Image',
          name: 'src',
          required: true,
        },
        {
          type: 'string',
          label: 'Alt Text',
          name: 'alt',
          required: true,
        },
        {
          type: 'string',
          label: 'Caption',
          name: 'caption',
        },
      ],
    },
  ],
};
