/* eslint-disable react-refresh/only-export-components */
import { Inter } from "next/font/google";
import { GlobalStyle } from "@/styles/GlobalStyle";
import { Metadata, Viewport } from "next";
import StyledComponentsRegistry from "@/lib/registry";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL('https://www.loveverse.space'),
    title: {
      default: 'LoveVerse – Mensagens de amor personalizadas',
      template: '%s | LoveVerse',
    },
    description: 'Crie mensagens românticas únicas para quem você ama',
    openGraph: {
      type: 'website',
      url: 'https://www.loveverse.space',
      title: 'LoveVerse',
      description: 'Crie mensagens românticas únicas',
      siteName: 'LoveVerse',
      images: [
        {
          url: 'https://res.cloudinary.com/diidbde0o/image/upload/v1747155241/23a5ad20-c297-474b-ae95-ecf42791b1ca_hibbb4.png',
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
      description: 'Crie mensagens românticas únicas',
      images: [
        'https://res.cloudinary.com/diidbde0o/image/upload/v1747155241/23a5ad20-c297-474b-ae95-ecf42791b1ca_hibbb4.png'
      ],
    },
    other: {
      'og:image': 'https://res.cloudinary.com/diidbde0o/image/upload/v1747155241/23a5ad20-c297-474b-ae95-ecf42791b1ca_hibbb4.png',
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
    <html lang="pt-BR" className={inter.className}>
      <body >
            <StyledComponentsRegistry>
              <GlobalStyle />
                {children}
            </StyledComponentsRegistry>
      </body>
    </html>
  );
}
