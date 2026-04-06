import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { Geist, Geist_Mono } from 'next/font/google';

import PortfolioApp from '../components/PortfolioApp';
import { LanguageProvider } from '../i18n/LanguageContext';
import { DEFAULT_LANGUAGE, LANGUAGES, type Language } from '../i18n/config';
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
  title: 'Aleksandra Cislowski | Frontend Developer & Scrum Master',
  description:
    'Portfolio of Aleksandra Cislowski — Frontend Developer and Scrum Master focused on high-quality product delivery, React, Next.js, and TypeScript.',
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

  return (
    <html
      lang={initialLanguage}
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body>
        <LanguageProvider initialLanguage={initialLanguage}>
          <ThemeRegistry>
            <PortfolioApp currentYear={currentYear}>{children}</PortfolioApp>
          </ThemeRegistry>
        </LanguageProvider>
      </body>
    </html>
  );
}
