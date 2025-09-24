import './globals.css';

import { Fustat } from 'next/font/google';

import { Providers } from '@/components/Providers';

const fustat = Fustat({
  variable: '--font-sans',
  subsets: ['latin'],
});

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
        className={`${fustat.variable} font-sans leading-relaxed antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
