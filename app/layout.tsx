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

const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Perla's Kitchen - Authentic Lebanese Flavours",
  description:
    "Perla is a professional self-taught chef and owner of Perla's Kitchen. She creates and sells authentic Lebanese desserts and meals, bringing the taste of home to your table.",
  openGraph: {
    images: ['/images/white-bg-logo.jpg'],
  },
  twitter: {
    images: ['/images/white-bg-logo.jpg'],
  },
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
