import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { Geist, Geist_Mono } from 'next/font/google';

import PortfolioApp from '../components/PortfolioApp';
import { SITE_CONFIG } from '../config/site';
import { LanguageProvider } from '../i18n/LanguageContext';
import { DEFAULT_LANGUAGE, LANGUAGES, type Language } from '../i18n/config';
import { translations } from '../i18n/translations';
import ThemeRegistry from './ThemeRegistry';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: SITE_CONFIG.seo.title,
  description: SITE_CONFIG.seo.description,
  applicationName: SITE_CONFIG.seo.siteName,
  metadataBase: new URL(SITE_CONFIG.siteUrl),
  authors: [{ name: SITE_CONFIG.brandName, url: SITE_CONFIG.siteUrl }],
  creator: SITE_CONFIG.brandName,
  publisher: SITE_CONFIG.brandName,
  keywords: [
    'Aleksandra Cislowski',
    'Frontend Developer',
    'Scrum Master',
    'React',
    'Next.js',
    'TypeScript',
    'Portfolio',
    'Accessibility',
    'Product Delivery',
  ],
  category: 'technology',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: SITE_CONFIG.seo.title,
    description: SITE_CONFIG.seo.description,
    url: SITE_CONFIG.siteUrl,
    siteName: SITE_CONFIG.seo.siteName,
    type: 'website',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: `${SITE_CONFIG.brandName} portfolio preview`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_CONFIG.seo.title,
    description: SITE_CONFIG.seo.description,
    creator: `@${SITE_CONFIG.brandName.replace(/\s+/g, '')}`,
    images: ['/twitter-image'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

function isLanguage(value: string | undefined): value is Language {
  return value !== undefined && LANGUAGES.includes(value as Language);
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const cookieLang = cookieStore.get('lang')?.value;
  const initialLanguage = isLanguage(cookieLang) ? cookieLang : DEFAULT_LANGUAGE;
  const currentYear = new Date().getFullYear();
  const localizedText = translations[initialLanguage];
  const avatarUrl = new URL(SITE_CONFIG.avatarImage, SITE_CONFIG.siteUrl).toString();
  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: SITE_CONFIG.brandName,
      url: SITE_CONFIG.siteUrl,
      image: avatarUrl,
      jobTitle: SITE_CONFIG.professionalTitle,
      description: SITE_CONFIG.seo.description,
      email: `mailto:${SITE_CONFIG.contactEmail}`,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Stockholm',
        addressCountry: 'SE',
      },
      sameAs: [
        SITE_CONFIG.socialLinks.linkedIn,
        SITE_CONFIG.socialLinks.github,
        SITE_CONFIG.socialLinks.lovorda,
      ],
      knowsAbout: [
        'React',
        'Next.js',
        'TypeScript',
        'Frontend Architecture',
        'Accessibility',
        'Scrum',
        'Product Delivery',
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_CONFIG.seo.siteName,
      url: SITE_CONFIG.siteUrl,
      description: SITE_CONFIG.seo.description,
      inLanguage: LANGUAGES,
    },
  ];

  return (
    <html
      lang={initialLanguage}
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body>
        <style>{`
          .skip-link {
            position: absolute;
            left: 16px;
            top: -48px;
            z-index: 2000;
            padding: 10px 14px;
            border-radius: 10px;
            background: #081224;
            color: #F8FAFC;
            text-decoration: none;
            font-weight: 700;
            transition: top 160ms ease;
          }

          .skip-link:focus {
            top: 16px;
          }
        `}</style>
        <a
          className='skip-link'
          href='#main-content'
        >
          {localizedText.accessibility.skipToMainContent}
        </a>
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <LanguageProvider initialLanguage={initialLanguage}>
          <ThemeRegistry>
            <PortfolioApp currentYear={currentYear}>{children}</PortfolioApp>
          </ThemeRegistry>
        </LanguageProvider>
      </body>
    </html>
  );
}
