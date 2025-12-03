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
import { Button } from '../ui/button';
import HeroVideoDialog from '../ui/hero-video-dialog';

const isExternalLink = (url: string) => {
  return url.startsWith('http://') || url.startsWith('https://') || url.startsWith('tel:') || url.startsWith('mailto:') || url.startsWith('#');
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
      <div className={`grid lg:grid-cols-12 gap-8 lg:gap-12 items-center pt-12 md:pt-16 pb-10 ${!hasImage ? 'justify-center' : ''}`} suppressHydrationWarning>
        <div className={`mt-12 lg:mt-0 ${hasImage ? 'text-center lg:text-left lg:col-span-7 2xl:col-span-6' : 'text-center lg:col-span-10 lg:col-start-2'}`} suppressHydrationWarning>
          {data.headline && (
            <div data-tina-field={tinaField(data, 'headline')}>
              <h1 className={`mt-4 text-balance text-2xl md:text-3xl xl:text-4xl tracking-tight font-bold font-serif leading-snug text-accent ${!hasImage ? 'mx-auto' : 'lg:mx-0 mx-auto'}`} suppressHydrationWarning>
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
              <div className={`mt-6 max-w-xl text-lg text-gray-600 font-normal leading-relaxed ${!hasImage ? 'mx-auto' : 'lg:mx-0 mx-auto'}`}>
                {data.tagline!}
              </div>
            </div>
          )}

          {data.usps && data.usps.length > 0 && (
            <div className={`mt-6 flex flex-col gap-4 text-base text-gray-700 ${!hasImage ? 'items-center' : 'items-center lg:items-start'}`}>
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
            </div>
          )}


          <div className={`mt-10 flex flex-col gap-4 ${hasImage ? 'justify-center items-center lg:justify-start lg:items-start' : 'justify-center items-center'}`}>
            <div className="flex flex-col sm:flex-row gap-4" suppressHydrationWarning>
              {data.actions &&
                data.actions.map((action, index) => {
                  const linkUrl = action!.link!;
                  const isExternal = isExternalLink(linkUrl);
                  const isPrimary = action!.type === 'button';

                  const handleClick = (e: React.MouseEvent) => {
                    if (linkUrl.startsWith('#')) {
                      e.preventDefault();
                      console.log('Anchor link clicked:', linkUrl);

                      // Extract anchor and query params
                      const [anchor, query] = linkUrl.split('?');
                      console.log('Anchor:', anchor, 'Query:', query);

                      // Update URL with query params if present (query params must come before hash)
                      if (query) {
                        const newUrl = `${window.location.pathname}?${query}${anchor}`;
                        window.history.pushState({}, '', newUrl);

                        // Dispatch custom event for form to react
                        const urlParams = new URLSearchParams(query);
                        window.dispatchEvent(new CustomEvent('formTypeChange', {
                          detail: { type: urlParams.get('type') }
                        }));
                        console.log('Dispatched formTypeChange event with type:', urlParams.get('type'));
                      }

                      // Wait a brief moment for React to update, then scroll
                      setTimeout(() => {
                        const element = document.querySelector(anchor);
                        console.log('Found element:', element);
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        } else {
                          console.error('Element not found for selector:', anchor);
                        }
                      }, 100);
                    }
                  };

                  return (
                    <div key={action!.label} data-tina-field={tinaField(action)} suppressHydrationWarning>
                      {linkUrl.startsWith('#') ? (
                        <Button
                          size='lg'
                          variant={isPrimary ? 'default' : 'outline'}
                          className={`px-8 py-6 text-base rounded-full transition-all duration-150 ease-out hover:scale-[1.02] cursor-pointer ${!isPrimary ? 'border-[1.5px] border-gray-300 bg-white hover:bg-orange-100 hover:shadow-sm !text-gray-900 hover:!text-gray-900' : 'bg-[var(--page-accent)] hover:opacity-90 text-white'}`}
                          onClick={handleClick}
                        >
                          <div className="flex items-center gap-2" suppressHydrationWarning>
                            {action?.icon && <Icon data={action?.icon} />}
                            <div className="flex flex-col items-start" suppressHydrationWarning>
                              <span className='text-nowrap font-medium' suppressHydrationWarning>{action!.label}</span>
                              {isPrimary && data.actionsSubtitle && (
                                <span className="text-xs font-normal opacity-90" suppressHydrationWarning>{data.actionsSubtitle}</span>
                              )}
                            </div>
                          </div>
                        </Button>
                      ) : (
                        <Button
                          asChild
                          size='lg'
                          variant={isPrimary ? 'default' : 'outline'}
                          className={`px-8 py-6 text-base rounded-full transition-all duration-150 ease-out hover:scale-[1.02] cursor-pointer ${!isPrimary ? 'border-[1.5px] border-gray-300 bg-white hover:bg-orange-100 hover:shadow-sm !text-gray-900 hover:!text-gray-900' : 'bg-[var(--page-accent)] hover:opacity-90 text-white'}`}
                        >
                          {isExternal ? (
                            <a
                              href={linkUrl}
                              target={linkUrl.startsWith('http') ? '_blank' : undefined}
                              rel={linkUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
                              className="flex items-center gap-2"
                              suppressHydrationWarning
                            >
                              {action?.icon && <Icon data={action?.icon} />}
                              <div className="flex flex-col items-start" suppressHydrationWarning>
                                <span className='text-nowrap font-medium' suppressHydrationWarning>{action!.label}</span>
                                {isPrimary && data.actionsSubtitle && (
                                  <span className="text-xs font-normal opacity-90" suppressHydrationWarning>{data.actionsSubtitle}</span>
                                )}
                              </div>
                            </a>
                          ) : (
                            <Link href={linkUrl} className="flex items-center gap-2" suppressHydrationWarning>
                              {action?.icon && <Icon data={action?.icon} />}
                              <div className="flex flex-col items-start" suppressHydrationWarning>
                                <span className='text-nowrap font-medium' suppressHydrationWarning>{action!.label}</span>
                                {isPrimary && data.actionsSubtitle && (
                                  <span className="text-xs font-normal opacity-90" suppressHydrationWarning>{data.actionsSubtitle}</span>
                                )}
                              </div>
                            </Link>
                          )}
                        </Button>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>

          {data.trust && (
            <div className="mt-6">
              <p className="text-base font-medium text-gray-600">{data.trust.text}</p>
            </div>
          )}
        </div>

        {hasImage && (
          <div className="relative flex justify-center lg:justify-end lg:col-span-5 2xl:col-span-6">
            <div className='relative w-full aspect-square' data-tina-field={tinaField(data, 'image')}>
              {/* Decorative background blob or gradient could go here if needed */}
              <div className='relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-2xl shadow-orange-900/10'>
                <ImageBlock image={data.image!} />
              </div>
            </div>
          </div>
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
      label: 'Actions Subtitle',
      name: 'actionsSubtitle',
      type: 'string',
      description: 'Optional subtitle text below the action buttons (e.g., "Gratis kennismaking ook mogelijk")',
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
