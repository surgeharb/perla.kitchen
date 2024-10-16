import './globals.css';

import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';

import { MainNav } from '@/components/main-nav';
import { cn } from '@/lib/utils';

import { CSPostHogProvider } from './providers';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: "Perla's Kitchen - Delicious Recipes",
  description:
    "Perla is a professional self-taught chef and owner of Perla's Kitchen. She specializes in creating delicious recipes that are perfect for any occasion",
};

const SHOW_MAIN_NAV = false;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <CSPostHogProvider>
        <body className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
          {SHOW_MAIN_NAV && <MainNav />}
          {children}
        </body>
      </CSPostHogProvider>
    </html>
  );
}
