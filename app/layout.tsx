import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider, CssBaseline, Container, Box } from '@mui/material';
import darkTheme from '../theme/darkTheme';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Projects from '../components/Projects';
import Contact from '../components/Contact';

import PortfolioApp from '../components/PortfolioApp';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Portfolio | TwojeImię.dev',
  description: 'Nowoczesne portfolio IT - React, Next.js, MUI',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='pl' className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <PortfolioApp>{children}</PortfolioApp>
      </body>
    </html>
  );
}
