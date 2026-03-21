import type { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';
import { SITE_URL } from '@/lib/seo';

const staticRoutes = [
  '/',
  '/criar',
  '/contato/loveverse',
  '/termos/loveverse',
  '/tutorial/loveverse',
  '/melhorias/loveverse',
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: new URL(route, SITE_URL).toString(),
    lastModified: now,
  }));

  try {
    const [messages, loveMessages] = await Promise.all([
      prisma.message.findMany({
        select: {
          id: true,
          createdAt: true,
        },
      }),
      prisma.love_message_theme.findMany({
        select: {
          id: true,
          createdAt: true,
        },
      }),
    ]);

    const messageEntries: MetadataRoute.Sitemap = messages.map((message) => ({
      url: new URL(`/messages/${message.id}`, SITE_URL).toString(),
      lastModified: message.createdAt,
    }));

    const loveMessageEntries: MetadataRoute.Sitemap = loveMessages.map((message) => ({
      url: new URL(`/messages/${message.id}/love`, SITE_URL).toString(),
      lastModified: message.createdAt,
    }));

    return [...staticEntries, ...messageEntries, ...loveMessageEntries];
  } catch {
    return staticEntries;
  }
}
