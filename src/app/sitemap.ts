// app/sitemap.ts
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://loveverse.space/",
      lastModified: new Date(),
    },
    {
      url: "https://loveverse.space/criar",
      lastModified: new Date(),
    },
    {
      url: "https://loveverse.space/contato/loveverse",
      lastModified: new Date(),
    },
    {
      url: "https://loveverse.space/termos/loveverse",
      lastModified: new Date(),
    },
    {
      url: "https://loveverse.space/tutorial/loveverse",
      lastModified: new Date(),
    },
  ];
}
