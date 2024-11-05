import { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { cn } from '@/lib/utils';
import { WhatsAppFAB } from '../whatsapp-fab';
import { MainNav } from './NavigationHeader';

const inter = Inter({ subsets: ['latin'] });

type Props = {
  children: ReactNode;
  locale: string;
};

const SHOW_MAIN_NAV = false;

export async function BaseLayout({ children, locale }: Props) {
  const messages = await getMessages({ locale });

  return (
    <html className="h-full" lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
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
