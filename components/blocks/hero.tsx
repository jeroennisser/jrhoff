'use client';
import { iconSchema } from '@/tina/fields/icon';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';
import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import { PageBlocksHero, PageBlocksHeroImage } from '../../tina/__generated__/types';
import { Icon } from '../icon';
import { Section, sectionBlockSchemaField } from '../layout/section';
import { AnimatedGroup } from '../motion-primitives/animated-group';
import { TextEffect } from '../motion-primitives/text-effect';
import { Button } from '../ui/button';
import HeroVideoDialog from '../ui/hero-video-dialog';
import { Transition } from 'motion/react';

const isExternalLink = (url: string) => {
  return url.startsWith('http://') || url.startsWith('https://') || url.startsWith('tel:') || url.startsWith('mailto:');
};
const transitionVariants = {
  container: {
    visible: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.75,
      },
    },
  },
  item: {
    hidden: {
      opacity: 0,
      filter: 'blur(12px)',
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      transition: {
        type: 'spring',
        bounce: 0.3,
        duration: 1.5,
      } as Transition,
    },
  },
};

export const Hero = ({ data }: { data: PageBlocksHero }) => {
  // Extract the background style logic into a more readable format
  let gradientStyle: React.CSSProperties | undefined = undefined;
  if (data.background) {
    const colorName = data.background
      .replace(/\/\d{1,2}$/, '')
      .split('-')
      .slice(1)
      .join('-');
    const opacity = data.background.match(/\/(\d{1,3})$/)?.[1] || '100';

    gradientStyle = {
      '--tw-gradient-to': `color-mix(in oklab, var(--color-${colorName}) ${opacity}%, transparent)`,
    } as React.CSSProperties;
  }

  const hasImage = !!(data.image && ((data.image.src && data.image.src.length > 0) || (data.image.videoUrl && data.image.videoUrl.length > 0)));

  return (
    <Section background={data.background!}>
      <div className={`grid lg:grid-cols-12 gap-8 lg:gap-12 items-center pt-12 md:pt-16 pb-10 ${!hasImage ? 'justify-center' : ''}`}>
        <div className={`mt-12 lg:mt-0 ${hasImage ? 'text-center lg:text-left lg:col-span-7 2xl:col-span-6' : 'text-center lg:col-span-10 lg:col-start-2'}`}>
          {data.headline && (
            <div data-tina-field={tinaField(data, 'headline')}>
              <h1 className={`mt-4 text-balance text-2xl md:text-3xl xl:text-4xl tracking-tight font-bold font-serif leading-snug text-accent animate-fade-in-blur ${!hasImage ? 'mx-auto' : 'lg:mx-0 mx-auto'}`}>
                {data.headline?.split(/(\s+)/).map((segment, i) => {
                  if (segment.includes('*')) {
                    return (
                      <span key={i} className="text-[var(--page-accent)]">
                        {segment.replaceAll('*', '')}
                      </span>
                    );
                  }
                  return <span key={i}>{segment}</span>;
                })}
              </h1>
            </div>
          )}
          {data.tagline && (
            <div data-tina-field={tinaField(data, 'tagline')}>
              <TextEffect per='line' preset='fade-in-blur' speedSegment={0.3} delay={0.5} as='div' className={`mt-6 max-w-xl text-lg text-gray-600 font-normal leading-relaxed ${!hasImage ? 'mx-auto' : 'lg:mx-0 mx-auto'}`}>
                {data.tagline!}
              </TextEffect>
            </div>
          )}

          {data.usps && data.usps.length > 0 && (
            <AnimatedGroup variants={transitionVariants} className={`mt-6 flex flex-col gap-4 text-base text-gray-700 ${!hasImage ? 'items-center' : 'items-center lg:items-start'}`}>
              {data.usps.map((usp, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-gray-600">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span className="text-gray-600">{usp?.text}</span>
                </div>
              ))}
            </AnimatedGroup>
          )}

          <AnimatedGroup variants={transitionVariants} className={`mt-10 flex flex-col sm:flex-row gap-4 ${hasImage ? 'justify-center items-center lg:justify-start lg:items-start' : 'justify-center items-center'}`}>
            {data.actions &&
              data.actions.map((action, index) => {
                const linkUrl = action!.link!;
                const isExternal = isExternalLink(linkUrl);
                
                return (
                  <div key={action!.label} data-tina-field={tinaField(action)}>
                    <Button
                      asChild
                      size='lg'
                      variant={action!.type === 'link' ? 'outline' : 'default'}
                      className={`px-8 py-6 text-base rounded-full transition-all duration-150 ease-out hover:scale-[1.02] ${action!.type === 'link' ? 'border-[1.5px] border-gray-300 bg-white hover:bg-orange-100 hover:shadow-sm !text-gray-900 hover:!text-gray-900' : 'bg-[var(--page-accent)] hover:opacity-90 text-white'}`}
                    >
                      {isExternal ? (
                        <a href={linkUrl} target={linkUrl.startsWith('http') ? '_blank' : undefined} rel={linkUrl.startsWith('http') ? 'noopener noreferrer' : undefined}>
                          {action?.icon && <Icon data={action?.icon} />}
                          <span className='text-nowrap font-medium'>{action!.label}</span>
                        </a>
                      ) : (
                        <Link href={linkUrl}>
                          {action?.icon && <Icon data={action?.icon} />}
                          <span className='text-nowrap font-medium'>{action!.label}</span>
                        </Link>
                      )}
                    </Button>
                  </div>
                );
              })}
          </AnimatedGroup>

          {data.trust && (
            <AnimatedGroup variants={transitionVariants} className="mt-6">
              <p className="text-base font-medium text-gray-600">{data.trust.text}</p>
              <p className="text-sm text-gray-500 mt-1">Al 12+ jaar ervaring met NIS & Body Therapy</p>
            </AnimatedGroup>
          )}
        </div>

        {hasImage && (
          <AnimatedGroup variants={transitionVariants} className="relative flex justify-center lg:justify-end lg:col-span-5 2xl:col-span-6">
            <div className='relative w-full aspect-square' data-tina-field={tinaField(data, 'image')}>
              {/* Decorative background blob or gradient could go here if needed */}
              <div className='relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-2xl shadow-orange-900/10'>
                <ImageBlock image={data.image!} />
              </div>
            </div>
          </AnimatedGroup>
        )}
      </div>
    </Section>
  );
};

const ImageBlock = ({ image }: { image: PageBlocksHeroImage }) => {
  if (image.videoUrl) {
    let videoId = '';
    if (image.videoUrl) {
      const embedPrefix = '/embed/';
      const idx = image.videoUrl.indexOf(embedPrefix);
      if (idx !== -1) {
        videoId = image.videoUrl.substring(idx + embedPrefix.length).split('?')[0];
      }
    }
    const thumbnailSrc = image.src ? image.src! : videoId ? `https://i3.ytimg.com/vi/${videoId}/maxresdefault.jpg` : '';

    return <HeroVideoDialog videoSrc={image.videoUrl} thumbnailSrc={thumbnailSrc} thumbnailAlt='Hero Video' />;
  }

  if (image.src) {
    return (
      <Image
        className='z-2 relative w-full h-full object-cover'
        alt={image!.alt || ''}
        src={image!.src!}
        height={1080}
        width={1080}
      />
    );
  }
};

export const heroBlockSchema: Template = {
  name: 'hero',
  label: 'Hero',
  ui: {
    previewSrc: '/blocks/hero.png',
    defaultItem: {
      tagline: "Here's some text above the other text",
      headline: 'This Big Text is Totally Awesome',
      text: 'Phasellus scelerisque, libero eu finibus rutrum, risus risus accumsan libero, nec molestie urna dui a leo.',
    },
  },
  fields: [
    sectionBlockSchemaField as any,
    {
      type: 'string',
      label: 'Headline',
      name: 'headline',
    },
    {
      type: 'string',
      label: 'Tagline',
      name: 'tagline',
      ui: {
        component: 'textarea',
      },
    },
    {
      label: 'USPs',
      name: 'usps',
      type: 'object',
      list: true,
      ui: {
        itemProps: (item) => ({ label: item.text }),
      },
      fields: [
        iconSchema as any,
        {
          label: 'Text',
          name: 'text',
          type: 'string',
        },
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
            name: "Tina",
            color: "white",
            style: "float",
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
    {
      label: 'Trust Element',
      name: 'trust',
      type: 'object',
      fields: [
        {
          label: 'Show Stars',
          name: 'stars',
          type: 'boolean',
        },
        {
          label: 'Text',
          name: 'text',
          type: 'string',
        },
      ],
    },
    {
      type: 'object',
      label: 'Image',
      name: 'image',
      fields: [
        {
          name: 'src',
          label: 'Image Source',
          type: 'image',
        },
        {
          name: 'alt',
          label: 'Alt Text',
          type: 'string',
        },
        {
          name: 'videoUrl',
          label: 'Video URL',
          type: 'string',
          description: 'If using a YouTube video, make sure to use the embed version of the video URL',
        },
      ],
    },
  ],
};
