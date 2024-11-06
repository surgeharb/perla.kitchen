import { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import { getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { MainNav } from '@/components/layout/NavigationHeader';
import { WhatsAppFAB } from '@/components/whatsapp-fab';
import { Locale, routing } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import { host } from '@/config';

import { PHProvider, PostHogPageViewDynamic } from './providers';

const inter = Inter({ subsets: ['latin'] });

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Omit<Props, 'children'>) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'LocaleLayout' });

  return {
    title: t('title'),
    description: t('description'),
    metadataBase: new URL(host),
    openGraph: {
      images: [`${host}/images/logo_200x200.png`],
    },
    twitter: {
      images: [`${host}/images/logo_200x200.png`],
    },
  };
}

const SHOW_MAIN_NAV = false;

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  const messages = await getMessages({ locale });

  return (
    <html className="h-full" lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <PHProvider>
        <body className={cn(inter.className, 'flex h-full flex-col')}>
          <NextIntlClientProvider messages={messages}>
            {SHOW_MAIN_NAV && <MainNav />}
            {children}
            <WhatsAppFAB />
            <PostHogPageViewDynamic />
          </NextIntlClientProvider>
        </body>
      </PHProvider>
    </html>
  );
}
