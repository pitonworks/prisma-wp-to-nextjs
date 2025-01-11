import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'WordPress Themes',
  description: 'Browse our collection of premium WordPress themes. Find the perfect theme for your website.',
  openGraph: {
    title: 'WordPress Themes | Prisma Themes',
    description: 'Browse our collection of premium WordPress themes. Find the perfect theme for your website.',
    images: [
      {
        url: '/themes/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Prisma Themes Collection',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WordPress Themes | Prisma Themes',
    description: 'Browse our collection of premium WordPress themes. Find the perfect theme for your website.',
    images: ['/themes/twitter-image.jpg'],
  },
}

export default function ThemesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
} 