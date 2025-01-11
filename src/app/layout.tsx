import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { headers } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Premium WordPress Themes | Prisma Themes",
    template: "%s | Prisma Themes",
  },
  description: "Discover our collection of premium WordPress themes. Modern, responsive, and feature-rich themes for your website.",
  keywords: ["wordpress themes", "premium themes", "responsive themes", "portfolio themes", "ecommerce themes"],
  authors: [{ name: "Prisma Themes" }],
  creator: "Prisma Themes",
  publisher: "Prisma Themes",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://prisma-themes.com",
    siteName: "Prisma Themes",
    title: "Premium WordPress Themes | Prisma Themes",
    description: "Discover our collection of premium WordPress themes. Modern, responsive, and feature-rich themes for your website.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Prisma Themes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Premium WordPress Themes | Prisma Themes",
    description: "Discover our collection of premium WordPress themes. Modern, responsive, and feature-rich themes for your website.",
    images: ["/twitter-image.jpg"],
    creator: "@prismathemes",
  },
  verification: {
    google: "your-google-site-verification",
    yandex: "your-yandex-verification",
    yahoo: "your-yahoo-verification",
    other: {
      me: ["your-personal-website"],
    },
  },
  alternates: {
    canonical: "https://prisma-themes.com",
    languages: {
      "en-US": "https://prisma-themes.com",
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const headersList = headers();
  const pathname = headersList.get("x-pathname") || "/";

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#ffffff" />
        
        {/* Preload critical assets */}
        <link
          rel="preload"
          href={inter.url}
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
