import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import PortfolioApp from '../components/PortfolioApp';
import { LanguageProvider } from '../i18n/LanguageContext';
import ThemeRegistry from './ThemeRegistry';
import { ThemeModeProvider } from '../theme/ThemeModeContext';

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentYear = new Date().getFullYear();

  return (
    <html lang='en' className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <LanguageProvider>
          <ThemeModeProvider>
            <ThemeRegistry>
              <PortfolioApp currentYear={currentYear}>{children}</PortfolioApp>
            </ThemeRegistry>
          </ThemeModeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
