// app/sitemap.ts
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.loveverse.space/",
      lastModified: new Date(),
    },
    {
      url: "https://www.loveverse.space/criar",
      lastModified: new Date(),
    },
    {
      url: "https://www.loveverse.space/contato/loveverse",
      lastModified: new Date(),
    },
    {
      url: "https://www.loveverse.space/termos/loveverse",
      lastModified: new Date(),
    },
    {
      url: "https://www.loveverse.space/tutorial/loveverse",
      lastModified: new Date(),
    },
  ];
}
