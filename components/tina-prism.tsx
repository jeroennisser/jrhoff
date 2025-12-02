'use client';

import dynamic from 'next/dynamic';

export const TinaPrism = dynamic(
    () => import('tinacms/dist/rich-text/prism').then((mod) => mod.Prism),
    {
        ssr: false,
        loading: () => <pre className="p-4 bg-gray-100 rounded">Loading code...</pre>,
    }
);
