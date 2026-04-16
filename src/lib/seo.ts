import type { Metadata } from 'next';

export const SITE_NAME = 'LoveVerse';
export const SITE_URL = 'https://loveverse-space.vercel.app';
export const DEFAULT_OG_IMAGE = '/img/banner-openg.png';
export const SEO_KEYWORDS = [
  'cartinha de amor',
  'mensagem romântica',
  'carta personalizada',
  'declaração de amor',
  'cartinha personalizada com QR Code',
  'mensagem de amor personalizada',
  'carta romântica online',
  'QR Code para declaração de amor',
  'LoveVerse',
];

const defaultTitle = 'Cartinha de Amor Personalizada com QR Code | LoveVerse';
const defaultDescription = 'Crie cartinha de amor personalizada, mensagem romântica e declaração de amor com QR Code na LoveVerse. Surpreenda com uma carta personalizada online, interativa e fácil de compartilhar.';

const createAbsoluteUrl = (pathname: string) => new URL(pathname, SITE_URL).toString();

export function truncateText(text: string, maxLength = 160) {
  const normalized = text.replace(/\s+/g, ' ').trim();

  if (normalized.length <= maxLength) {
    return normalized;
  }

  return `${normalized.slice(0, maxLength - 1).trimEnd()}…`;
}

export function buildMetadata({
  title,
  description = defaultDescription,
  pathname = '/',
  images = [DEFAULT_OG_IMAGE],
  keywords = SEO_KEYWORDS,
  index = true,
}: {
  title?: string;
  description?: string;
  pathname?: string;
  images?: string[];
  keywords?: string[];
  index?: boolean;
} = {}): Metadata {
  const canonicalUrl = createAbsoluteUrl(pathname);
  const resolvedTitle = title ?? defaultTitle;

  return {
    metadataBase: new URL(SITE_URL),
    title: resolvedTitle,
    description,
    keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index,
      follow: index,
      'max-image-preview': 'large',
      googleBot: {
        index,
        follow: index,
        'max-image-preview': 'large',
      },
    },
    openGraph: {
      type: 'website',
      locale: 'pt_BR',
      url: canonicalUrl,
      title: resolvedTitle,
      description,
      siteName: SITE_NAME,
      images: images.map((image) => ({
        url: image,
        width: 1200,
        height: 630,
        alt: resolvedTitle,
      })),
    },
    twitter: {
      card: 'summary_large_image',
      title: resolvedTitle,
      description,
      images,
      creator: '@loveverse_space',
    },
  };
}

export const defaultSeo = {
  title: defaultTitle,
  description: defaultDescription,
};

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  logo: createAbsoluteUrl('/apple-touch-icon.png'),
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL,
  description: defaultDescription,
  inLanguage: 'pt-BR',
};
