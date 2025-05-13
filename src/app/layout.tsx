/* eslint-disable react-refresh/only-export-components */
import { Inter } from "next/font/google";
import { GlobalStyle } from "@/styles/GlobalStyle";
import { Metadata, Viewport } from "next";
import ReduxProvider from "@/store/reduxProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | LoveVerse",
    default: "LoveVerse – Crie mensagens encantadoras e compartilhe amor",
  },
  description: "Com o LoveVerse, você pode criar e enviar mensagens personalizadas, românticas e criativas para quem ama.",
  keywords: [ "LoveVerse",
    "mensagens de amor",
    "cartas românticas",
    "frases para namorado",
    "mensagens personalizadas",
    "romantismo",
    "conquistar namorada",
    "site para casais",
  ],
  applicationName: "LoveVerse",
  other: {
    // Meta tags genéricas
    "robots": "index, follow",
    "revisit-after": "7 days",
    // OpenGraph extras
    "og:locale:alternate": "en_US",
  },
  metadataBase: new URL("https://www.loveverse.space"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "LoveVerse - Envie mensagens de amor inesquecíveis",
    description:
      "Descubra a magia de expressar sentimentos com o LoveVerse. Crie mensagens personalizadas e surpreenda quem você ama.",
    url: "https://www.loveverse.space/",
    type: "website",
    images: [
      {
        url: "https://res.cloudinary.com/diidbde0o/image/upload/v1747155241/23a5ad20-c297-474b-ae95-ecf42791b1ca_hibbb4.png",
        width: 1200,
        height: 630,
        alt: "LoveVerse – Crie mensagens inesquecíveis",
      },
    ],
    siteName: "LoveVerse",
    locale: "pt_BR",
  },
  twitter: {
     card: "summary_large_image",
    title: "LoveVerse - Envie mensagens de amor inesquecíveis",
    description:
      "Descubra a magia de expressar sentimentos com o LoveVerse. Crie mensagens personalizadas e surpreenda quem você ama.",
    images: ["https://res.cloudinary.com/diidbde0o/image/upload/v1747155241/23a5ad20-c297-474b-ae95-ecf42791b1ca_hibbb4.png"],
  },
};

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
