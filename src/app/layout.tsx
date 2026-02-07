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
    metadataBase: new URL('https://www.loveverse.space'),
    title: {
      default: 'LoveVerse | Mensagens personalizadas para casais',
      template: '%s | LoveVerse',
    },
    description: 'Crie mensagens personalizadas e únicas para quem você ama. Receba o QR Code para compartilhar suas mensagens de forma interativa. Surpreenda com carinho e criatividade usando nossa plataforma gratuita por tempo limitado.',
    openGraph: {
      type: 'website',
      url: 'https://www.loveverse.space',
      title: 'LoveVerse',
      description: 'Crie mensagens personalizadas únicas para quem você ama e surpreenda com carinho e criatividade. Explore nossa plataforma para criar mensagens interativas e gratuitas por tempo limitado.',
      siteName: 'LoveVerse',
      images: [
        {
          url: '/img/android-chrome-512x512.png',
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
        '/img/email-tutorial.png'
      ],
    },
    other: {
      'og:image': '/img/email-tutorial.png',
      'og:image:width': '1200',
      'og:image:height': '630',
      'og:image:alt': 'LoveVerse - Compartilhe amor',
      'og:image:type': 'image/png',
      'og:updated_time': new Date().toISOString(),
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
