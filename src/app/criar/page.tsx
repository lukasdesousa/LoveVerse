import Create from "@/components/Pages/create-component/Create";
import { Metadata, Viewport } from "next";
import { LoadPage } from "@/components/LoadPage/LoadPage";

const ogUpdatedTime = new Date().toISOString();

export const dynamic = 'force-dynamic';
const publicImageUrl = 'https://www.loveverse.space/img/LoveVerse-banner.png';

// eslint-disable-next-line react-refresh/only-export-components
export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL('https://www.loveverse.space'),
    title: {
      default: 'LoveVerse – Criar mensagem personalizada',
      template: '%s | LoveVerse',
    },
    description: 'Crie mensagens de amor únicas e interativas. Com imagem, música e muito mais por apenas R$7,90',
    openGraph: {
      type: 'website',
      url: 'https://www.loveverse.space',
      title: 'LoveVerse',
      description: 'Crie mensagens personalizadas únicas',
      siteName: 'LoveVerse',
      images: [
        {
          url: publicImageUrl,
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
        publicImageUrl
      ],
    },
    other: {
      'og:image': publicImageUrl,
      'og:image:width': '1200',
      'og:image:height': '630',
      'og:image:alt': 'LoveVerse - Compartilhe amor',
      'og:image:type': 'image/png',
      'og:updated_time': ogUpdatedTime,
    },
  };
}

// eslint-disable-next-line react-refresh/only-export-components
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

function Index() {
  return (
    <LoadPage>
      <Create />
    </LoadPage>
  )
};

export default Index;