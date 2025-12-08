import Link from 'next/link'
import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import { iconSchema } from '@/tina/fields/icon';
import { Button } from '@/components/ui/button'
import { PageBlocksCta } from '@/tina/__generated__/types';
import { Icon } from '../icon';
import { Section, sectionBlockSchemaField } from '../layout/section';

const isExternalLink = (url: string) => {
    return url.startsWith('http://') || url.startsWith('https://') || url.startsWith('tel:') || url.startsWith('mailto:');
};

export const CallToAction = ({ data }: { data: PageBlocksCta }) => {
    const isPrimaryBackground = data.background === 'bg-primary';

    return (
        <Section background={data.background!}>
            <div className="text-center">
                <h2 className={`text-balance text-4xl font-semibold lg:text-5xl ${isPrimaryBackground ? 'text-white' : ''}`} data-tina-field={tinaField(data, 'title')}>{data.title}</h2>
                <p className={`mt-4 text-lg ${isPrimaryBackground ? 'text-white/95' : ''}`} data-tina-field={tinaField(data, 'description')}>{data.description}</p>

                <div className="mt-12 flex flex-wrap justify-center gap-4">
                    {data.actions && data.actions.map(action => {
                        const linkUrl = action!.link!;
                        const isExternal = isExternalLink(linkUrl);
                        const isPrimary = action!.type === 'button';

                        // Calculate icon override for contrast
                        let iconData = action?.icon;
                        if (iconData && isPrimaryBackground) {
                            if (isPrimary) {
                                // Primary button on primary bg = White button with Accent text -> Icon should be Accent
                                iconData = { ...iconData, color: 'accent' };
                            } else {
                                // Secondary/Link on primary bg = White text -> Icon should be White
                                iconData = { ...iconData, color: 'white' };
                            }
                        }

                        // Button styling classes
                        const variantClasses = isPrimaryBackground
                            ? (isPrimary
                                // Primary (Button): White bg, Accent text
                                ? 'bg-white hover:bg-white/90 text-[var(--page-accent)] border border-transparent'
                                // Secondary (Link): Transparent, White text, White border
                                : 'bg-transparent hover:bg-white/20 text-white border border-white hover:border-white')
                            : (isPrimary
                                // Default Primary
                                ? '' // defaults handle it
                                // Default Secondary
                                : '');

                        return (
                            <div key={action!.label} data-tina-field={tinaField(action)}>
                                <Button
                                    asChild
                                    size="lg"
                                    variant={isPrimary ? 'default' : 'outline'}
                                    className={`group px-7 py-3 text-base transition-all duration-150 ease-out hover:scale-[1.02] ${variantClasses}`}>
                                    {isExternal ? (
                                        <a href={linkUrl} target={linkUrl.startsWith('http') ? '_blank' : undefined} rel={linkUrl.startsWith('http') ? 'noopener noreferrer' : undefined} className="flex items-center gap-2">
                                            {action?.icon && (
                                                <Icon data={iconData} />
                                            )}
                                            <div className="flex flex-col items-start">
                                                <span className="text-nowrap">{action!.label}</span>
                                                {isPrimary && data.actionsSubtitle && (
                                                    <span className="text-xs font-normal opacity-90">{data.actionsSubtitle}</span>
                                                )}
                                            </div>
                                        </a>
                                    ) : (
                                        <Link href={linkUrl} className="flex items-center gap-2">
                                            {action?.icon && (
                                                <Icon data={iconData} />
                                            )}
                                            <div className="flex flex-col items-start">
                                                <span className="text-nowrap">{action!.label}</span>
                                                {isPrimary && data.actionsSubtitle && (
                                                    <span className="text-xs font-normal opacity-90">{data.actionsSubtitle}</span>
                                                )}
                                            </div>
                                        </Link>
                                    )}
                                </Button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </Section>
    )
}


export const ctaBlockSchema: Template = {
    name: "cta",
    label: "CTA",
    ui: {
        previewSrc: "/blocks/cta.png",
        defaultItem: {
            title: "Start Building",
            description: "Get started with TinaCMS today and take your content management to the next level.",
            actions: [
                {
                    label: 'Get Started',
                    type: 'button',
                    link: '/',
                },
                {
                    label: 'Book Demo',
                    type: 'link',
                    link: '/',
                },
            ],
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
            ui: {
                component: "textarea",
            },
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
            description: 'Optional subtitle text below the action buttons',
        },
    ],
};
