# JRHOFF - NIS & Body Therapy Website

A modern, visually stunning website for Jeroen Hoff's NIS & Body Therapy practice, built with Next.js and TinaCMS.

## 🎨 Features

- **Visual CMS**: Powered by [TinaCMS](https://app.tina.io) for easy content management
- **Modern Design**: Premium UI with warm color palette, smooth animations, and glassmorphism effects
- **Responsive**: Fully responsive design optimized for all devices
- **Performance**: Built with Next.js 15 and Turbopack for optimal performance
- **Type-Safe**: Full TypeScript support with auto-generated types from TinaCMS schema

## 🚀 Tech Stack

- **Framework**: Next.js 15 with Turbopack
- **CMS**: TinaCMS for content management
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Motion (Framer Motion) for smooth transitions
- **Icons**: Lucide React
- **Authentication**: Custom login system

## 📦 Getting Started

### Prerequisites

- Node.js (Active LTS version)
- npm or pnpm
- A [TinaCMS](https://app.tina.io) account

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd jrhoff
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
```

3. Set up environment variables:
Create a `.env.local` file with:
```
NEXT_PUBLIC_TINA_CLIENT_ID=<your-tina-client-id>
TINA_TOKEN=<your-tina-token>
NEXT_PUBLIC_TINA_BRANCH=main
```

4. Run the development server:
```bash
npm run dev
```

### Local URLs

- **Website**: http://localhost:3000
- **CMS Admin**: http://localhost:3000/admin
- **GraphQL Playground**: http://localhost:4001/altair/

## 🎨 Design System

The website features a carefully crafted design system:

- **Color Palette**: Warm beige background (#FCF2E9) with orange accent (#EB5A3C)
- **Typography**: Serif headings with sans-serif body text
- **Components**: Reusable blocks including Hero, Features, Content, and CTA sections
- **Animations**: Staggered fade-in effects and smooth transitions

## 📝 Content Management

Content is managed through TinaCMS and stored as MDX files in the `content/pages/` directory:

- `home.mdx` - Homepage with hero and features
- `nis.mdx` - NIS treatment information
- `about.mdx` - About page
- `contact.mdx` - Contact information
- `tarieven.mdx` - Pricing information

## 🔧 Development

### Project Structure

```
jrhoff/
├── app/                    # Next.js app directory
├── components/             # React components
│   ├── blocks/            # Content blocks (Hero, Features, etc.)
│   ├── layout/            # Layout components (Header, Footer)
│   └── motion-primitives/ # Animation components
├── content/               # MDX content files
├── styles.css             # Global styles and design tokens
└── tina/                  # TinaCMS configuration
```

### Key Components

- **Hero Block**: Asymmetrical layout with animated text and circular image
- **Features Block**: Grid layout for showcasing key features
- **Content Block**: Flexible markdown content rendering
- **CTA Block**: Call-to-action sections with buttons

## 🚢 Deployment

The site can be deployed to:

- **Vercel**: Recommended for Next.js apps
- **GitHub Pages**: Static export support (see original README for details)
- **Other platforms**: Any platform supporting Next.js

## 📄 License

Licensed under the [Apache 2.0 license](./LICENSE).

## 🤝 Support

For TinaCMS-related questions:
- [Documentation](https://tina.io/docs/)
- [Discord Community](https://discord.gg/zumN63Ybpf)
- [Community Forum](https://community.tinacms.org/)

---

Built with ❤️ for holistic health and wellness.
