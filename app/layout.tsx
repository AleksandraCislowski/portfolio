import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import PortfolioApp from '../components/PortfolioApp';
import { LanguageProvider } from '../i18n/LanguageContext';
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
  title: 'Portfolio | YourName.dev',
  description: 'Modern IT portfolio - React, Next.js, MUI',
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
          <ThemeRegistry>
            <PortfolioApp currentYear={currentYear}>{children}</PortfolioApp>
          </ThemeRegistry>
        </LanguageProvider>
      </body>
    </html>
  );
}
