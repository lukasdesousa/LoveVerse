/* eslint-disable react-refresh/only-export-components */
import { Inter } from "next/font/google";
import { GlobalStyle } from "@/styles/GlobalStyle";
import { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Quicksand } from 'next/font/google'

const quicksand = Quicksand({
  subsets: ['latin'],
  variable: '--font-quicksand',
  display: 'swap', // opcional, para evitar FOUT
})

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL('https://loveverse.space'),
    title: {
      default: 'Cartinhas de Amor Personalizadas com QR Code | LoveVerse',
      template: '%s | LoveVerse',
    },
    alternates: {
      canonical: '/',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
      },
    },
    applicationName: 'LoveVerse',
    description: 'Crie cartinhas de amor personalizadas com QR Code. Gere mensagens românticas interativas para compartilhar online. Plataforma gratuita e fácil de usar.',
    openGraph: {
      type: 'website',
      url: 'https://loveverse.space',
      title: 'LoveVerse',
      description: 'Crie cartinhas de amor personalizadas únicas para quem você ama e surpreenda com carinho e criatividade. Explore nossa plataforma para criar cartinhas interativas e gratuitas por tempo limitado.',
      siteName: 'LoveVerse',
      images: [
        {
          url: '/img/banner-openg.png',
          width: 1200,
          height: 630,
          alt: 'LoveVerse - Compartilhe amor',
          type: 'image/png'
        },
      ],
      locale: 'pt_BR',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'LoveVerse',
      description: 'Crie mensagens personalizadas únicas',
      images: [
        '/img/banner-openg.png'
      ],
    },
  };
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.className} ${quicksand.variable}`}>
      <head>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "LoveVerse",
            "url": "https://loveverse.space",
            "description": "Plataforma para criar cartinhas de amor personalizadas com QR Code"
          })}
        </script>
        <meta name="google-adsense-account" content="ca-pub-3912537462625302" />
      </head>
      <body >
        <GlobalStyle />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
