import type { Metadata } from 'next';
import { Fustat, STIX_Two_Text } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/Providers';

const fustat = Fustat({
  variable: '--font-sans',
  subsets: ['latin'],
});

const stixTwoText = STIX_Two_Text({
  variable: '--font-serif',
  subsets: ['latin'],
});

const siteUrl = new URL('https://rapibots.ai');
const ogImage = '/og-image.webp';

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: 'Rapibots | Automatiza tu negocio con IA',
  description:
    'Rapibots es una plataforma de IA que te ayuda a automatizar tu negocio. Mientras tu descansas, tus asistentes trabajan por ti.',
  keywords: [
    'rapibots',
    'automatizacion',
    'ia',
    'negocio',
    'shopify',
    'woocommerce',
  ],
  authors: [{ name: 'Rapibots', url: siteUrl.toString() }],
  creator: 'Rapibots',
  publisher: 'Rapibots',
  alternates: {
    canonical: '/',
    languages: {
      'es-CO': '/',
      en: '/en',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    url: siteUrl.toString(),
    siteName: 'Rapibots',
    title: 'Rapibots | Automatiza tu negocio con IA',
    description:
      'Rapibots es una plataforma de IA que te ayuda a automatizar tu negocio. Mientras tu descansas, tus asistentes trabajan por ti.',
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: 'Rapibots asistiendo la logística de un negocio',
        type: 'image/webp',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rapibots | Automatiza tu negocio con IA',
    description:
      'Automatiza atención, ventas y operaciones con asistentes de IA conectados a tus canales.',
    site: '@djbautista10',
    creator: '@djbautista10',
    images: [ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon0.svg', type: 'image/svg+xml' },
    ],
    shortcut: ['/favicon.ico'],
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  applicationName: 'Rapibots',
  manifest: '/site.webmanifest',
  themeColor: '#ffffff',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-title" content="Rapibots" />
      </head>
      <body
        className={`${fustat.variable} ${stixTwoText.variable} font-sans leading-relaxed antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
