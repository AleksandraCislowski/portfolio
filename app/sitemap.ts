import type { MetadataRoute } from 'next';

import { SITE_CONFIG } from '../config/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const url = SITE_CONFIG.siteUrl;
  const lastModified = new Date();

  return [
    {
      url,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
