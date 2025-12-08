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

export const Hero = ({ data, priority = false }: { data: PageBlocksHero; priority?: boolean }) => {
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
      <div className={`grid ${hasImage ? 'grid-cols-1 lg:grid-cols-2' : 'lg:grid-cols-1'} gap-8 lg:gap-12 items-center ${hasImage ? 'justify-items-center lg:justify-items-stretch' : ''} pt-12 md:pt-16 lg:pt-20 pb-10 md:pb-12`} suppressHydrationWarning>
        <div className={`mt-0 lg:mt-0 w-full ${hasImage ? 'text-left max-w-2xl lg:max-w-none' : 'text-center mx-auto max-w-3xl'}`} suppressHydrationWarning>
          {data.headline && (
            <div data-tina-field={tinaField(data, 'headline')}>
              <h1 className={`text-balance text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl tracking-tight font-bold font-serif leading-[1.15] sm:leading-[1.2] ${!hasImage ? 'mx-auto' : ''}`} suppressHydrationWarning>
                {data.headline?.split('|').map((part, i) => (
                  <React.Fragment key={i}>
                    {i > 0 && <br />}
                    <span className={i === 0 ? 'text-[#2D2926]' : 'text-[var(--page-accent)]'}>
                      {part}
                    </span>
                  </React.Fragment>
                ))}
              </h1>
            </div>
          )}
          {data.tagline && (
            <div data-tina-field={tinaField(data, 'tagline')}>
              <div className={`mt-6 md:mt-8 max-w-xl text-base md:text-lg text-gray-700 font-normal leading-relaxed font-sans ${!hasImage ? 'mx-auto' : ''}`}>
                {data.tagline!}
              </div>
            </div>
          )}

          {data.usps && data.usps.length > 0 && (
            <div className={`mt-8 md:mt-10 flex flex-col gap-4 md:gap-5 text-base md:text-base text-gray-700 ${!hasImage ? 'items-center' : 'items-start'}`}>
              {data.usps.map((usp, i) => (
                <div key={i} className="flex items-start gap-3 md:gap-3">
                  <div className="flex-shrink-0 w-5 h-5 md:w-5 md:h-5 flex items-center justify-center mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 md:w-5 md:h-5 text-[var(--page-accent)]">
                      <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700 leading-relaxed">{usp?.text}</span>
                </div>
              ))}
            </div>
          )}


          <div className={`mt-10 md:mt-12 flex flex-col gap-3 md:gap-4 ${hasImage ? 'justify-start items-start' : 'justify-center items-center'}`}>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full sm:w-auto" suppressHydrationWarning>
              {data.actions &&
                data.actions.map((action, index) => {
                  const linkUrl = action!.link!;
                  const isExternal = isExternalLink(linkUrl);
                  const isPrimary = action!.type === 'button';

                  const handleClick = (e: React.MouseEvent) => {
                    if (linkUrl.startsWith('#')) {
                      e.preventDefault();

                      // Extract anchor and query params
                      const [anchor, query] = linkUrl.split('?');

                      // Update URL with query params if present (query params must come before hash)
                      if (query) {
                        const newUrl = `${window.location.pathname}?${query}${anchor}`;
                        window.history.pushState({}, '', newUrl);

                        // Dispatch custom event for form to react
                        const urlParams = new URLSearchParams(query);
                        window.dispatchEvent(new CustomEvent('formTypeChange', {
                          detail: { type: urlParams.get('type') }
                        }));
                      }

                      // Wait a brief moment for React to update, then scroll
                      setTimeout(() => {
                        const element = document.querySelector(anchor);
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
                          className={`w-full sm:w-auto px-6 md:px-8 py-4 md:py-6 text-sm md:text-base rounded-full transition-all duration-150 ease-out hover:scale-[1.02] cursor-pointer ${!isPrimary ? 'border-[1.5px] border-gray-300 bg-white hover:bg-orange-100 hover:shadow-sm !text-gray-900 hover:!text-gray-900' : 'bg-[var(--page-accent)] hover:opacity-90 text-white'}`}
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
                          className={`w-full sm:w-auto px-6 md:px-8 py-4 md:py-6 text-sm md:text-base rounded-full transition-all duration-150 ease-out hover:scale-[1.02] cursor-pointer ${!isPrimary ? 'border-[1.5px] border-gray-300 bg-white hover:bg-orange-100 hover:shadow-sm !text-gray-900 hover:!text-gray-900' : 'bg-[var(--page-accent)] hover:opacity-90 text-white'}`}
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
            <div className="mt-4 md:mt-6">
              <p className="text-sm md:text-base font-medium text-gray-600">{data.trust.text}</p>
            </div>
          )}
        </div>

        {hasImage && (
          <div className="relative flex justify-center order-first lg:order-last">
            <div className='relative breathing-circle w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96' data-tina-field={tinaField(data, 'image')}>
              {/* Decorative background blob or gradient could go here if needed */}
              <div className='relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-2xl shadow-orange-900/10'>
                <ImageBlock image={data.image!} priority={priority} />
              </div>
            </div>
          </div>
        )}
      </div>
    </Section>
  );
};

const ImageBlock = ({ image, priority = false }: { image: PageBlocksHeroImage; priority?: boolean }) => {
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
        alt={image!.alt || 'Hero image'}
        src={image!.src!}
        height={1080}
        width={1080}
        priority={priority}
        fetchPriority={priority ? "high" : undefined}
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
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
