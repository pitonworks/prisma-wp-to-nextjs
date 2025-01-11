import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://prisma-themes.com'

  // Get all themes
  const themes = await prisma.theme.findMany({
    select: {
      id: true,
      updatedAt: true,
    },
  })

  // Generate theme URLs
  const themeUrls = themes.map((theme) => ({
    url: `${baseUrl}/themes/${theme.id}`,
    lastModified: theme.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Static pages
  const routes = [
    '',
    '/themes',
    '/about',
    '/contact',
    '/blog',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 1,
  }))

  return [...routes, ...themeUrls]
} 