import './globals.css';

import React from 'react';
import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import dynamic from 'next/dynamic';

import { WhatsAppFAB } from '@/components/whatsapp-fab';
import { MainNav } from '@/components/main-nav';
import { cn } from '@/lib/utils';

import { PHProvider } from './providers';

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

const PostHogPageView = dynamic(() => import('./pageview'), {
  ssr: false,
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <PHProvider>
        <body className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
          {SHOW_MAIN_NAV && <MainNav />}
          {children}
          <WhatsAppFAB />
          <PostHogPageView />
        </body>
      </PHProvider>
    </html>
  );
}
