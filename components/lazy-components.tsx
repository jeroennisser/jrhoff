'use client';

import dynamic from 'next/dynamic';
import { ComponentType } from 'react';

// Lazy load heavy animation components
export const AnimatedGroup = dynamic(
    () => import('./motion-primitives/animated-group').then(mod => ({ default: mod.AnimatedGroup })),
    {
        ssr: false,
        loading: () => null,
    }
);

export const TextEffect = dynamic(
    () => import('./motion-primitives/text-effect').then(mod => ({ default: mod.TextEffect })),
    {
        ssr: false,
        loading: () => null,
    }
);

export const InfiniteSlider = dynamic(
    () => import('./motion-primitives/infinite-slider').then(mod => ({ default: mod.InfiniteSlider })),
    {
        ssr: false,
        loading: () => null,
    }
);

export const ProgressiveBlur = dynamic(
    () => import('./motion-primitives/progressive-blur').then(mod => ({ default: mod.ProgressiveBlur })),
    {
        ssr: false,
        loading: () => null,
    }
);

// Lazy load video dialog (only when needed)
export const VideoDialog = dynamic(
    () => import('./ui/VideoDialog'),
    {
        ssr: false,
    }
);

export const HeroVideoDialog = dynamic(
    () => import('./ui/hero-video-dialog'),
    {
        ssr: false,
        loading: () => (
            <div className="aspect-video w-full bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg" />
        ),
    }
);
