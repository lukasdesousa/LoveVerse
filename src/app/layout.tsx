/* eslint-disable react-refresh/only-export-components */
import { Inter } from "next/font/google";
import { GlobalStyle } from "@/styles/GlobalStyle";
import { Metadata, Viewport } from "next";
import ReduxProvider from "@/store/reduxProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://www.loveverse.space'), // ESSENCIAL
  title: {
    template: '%s | LoveVerse',
    default: 'LoveVerse – Mensagens de amor personalizadas',
  },
  description: 'Crie mensagens românticas únicas para quem você ama',
  
  // OpenGraph (Facebook, WhatsApp, etc.)
  openGraph: {
    type: 'website',
    url: 'https://www.loveverse.space',
    title: 'LoveVerse',
    description: 'Crie mensagens românticas únicas',
    siteName: 'LoveVerse',
    images: [
      {
        url: 'https://res.cloudinary.com/diidbde0o/image/upload/v1747155241/23a5ad20-c297-474b-ae95-ecf42791b1ca_hibbb4.png', // Caminho absoluto ou URL completa
        width: 1200,
        height: 630,
        alt: 'LoveVerse - Compartilhe amor',
      },
    ],
    locale: 'pt_BR',
  },

  // Twitter
  twitter: {
    card: 'summary_large_image',
    title: 'LoveVerse',
    description: 'Crie mensagens românticas únicas',
    images: ['https://res.cloudinary.com/diidbde0o/image/upload/v1747155241/23a5ad20-c297-474b-ae95-ecf42791b1ca_hibbb4.png'], // Mesma imagem do OG
  },

  // WhatsApp requer estas tags adicionais
  other: {
    'og:image:width': '1200',
    'og:image:height': '630',
    'og:image:alt': 'LoveVerse - Compartilhe amor',
    'og:image:type': 'image/png', // Especifique o tipo
    'og:updated_time': new Date().toISOString(), // Evita cache
  }
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
    <html lang="pt-BR" className={inter.className}>
      <body >
        <ReduxProvider>
          <GlobalStyle />
            {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
