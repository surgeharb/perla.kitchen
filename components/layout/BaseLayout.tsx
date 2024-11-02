import { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { cn } from '@/lib/utils';
import { WhatsAppFAB } from '../whatsapp-fab';
import { MainNav } from '../MainNav';

const inter = Inter({ subsets: ['latin'] });

type Props = {
  children: ReactNode;
  locale: string;
};

const SHOW_MAIN_NAV = false;

export async function BaseLayout({ children, locale }: Props) {
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html className="h-full" lang={locale}>
      <body className={cn(inter.className, 'flex h-full flex-col')}>
        <NextIntlClientProvider messages={messages}>
          {SHOW_MAIN_NAV && <MainNav />}
          {children}
          <WhatsAppFAB />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
