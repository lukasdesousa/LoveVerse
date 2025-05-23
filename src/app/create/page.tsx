import Create from "@/components/create-component/Create";
import { Metadata, Viewport } from "next";
import { LoadPage } from "@/components/LoadPage/LoadPage";

const ogUpdatedTime = new Date().toISOString();

export const dynamic = 'force-dynamic';

// eslint-disable-next-line react-refresh/only-export-components
export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL('https://www.loveverse.space'),
    title: {
      default: 'LoveVerse – Crie uma mensagem',
      template: '%s | LoveVerse',
    },
    description: 'Crie mensagens românticas únicas e interativas por apenas R$7,90',
    openGraph: {
      type: 'website',
      url: 'https://www.loveverse.space',
      title: 'LoveVerse',
      description: 'Crie mensagens românticas únicas',
      siteName: 'LoveVerse',
      images: [
        {
          url: 'https://res.cloudinary.com/diidbde0o/image/upload/v1747767779/loveverse_f5jnyz.jpg',
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
        'https://res.cloudinary.com/diidbde0o/image/upload/v1747767779/loveverse_f5jnyz.jpg'
      ],
    },
    other: {
      'og:image': 'https://res.cloudinary.com/diidbde0o/image/upload/v1747767779/loveverse_f5jnyz.jpg',
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