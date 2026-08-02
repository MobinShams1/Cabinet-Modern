import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/', '/employee/'], 
    },
    sitemap: 'https://yourdomain.com/sitemap.xml',
  };
}