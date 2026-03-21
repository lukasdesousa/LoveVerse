/* eslint-disable react-refresh/only-export-components */
import { Inter, Quicksand } from 'next/font/google';
import type { Metadata, Viewport } from 'next';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { GlobalStyle } from '@/styles/GlobalStyle';
import {
  buildMetadata,
  defaultSeo,
  organizationSchema,
  SEO_KEYWORDS,
  websiteSchema,
} from '@/lib/seo';

const quicksand = Quicksand({
  subsets: ['latin'],
  variable: '--font-quicksand',
  display: 'swap',
});

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  ...buildMetadata({
    title: `${defaultSeo.title} | Mensagem Romântica e Declaração de Amor`,
    description: defaultSeo.description,
    pathname: '/',
    keywords: SEO_KEYWORDS,
  }),
  title: {
    default: 'Cartinha de Amor Personalizada com QR Code | LoveVerse',
    template: '%s | LoveVerse',
  },
  applicationName: 'LoveVerse',
  category: 'relationships',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

const structuredData = [websiteSchema, organizationSchema];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.className} ${quicksand.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>
        <GlobalStyle />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
