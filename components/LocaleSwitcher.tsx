'use client';

import { useTransition } from 'react';
import { useParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';

import { routing } from '@/i18n/routing';
import { Locale, usePathname, useRouter } from '@/i18n/routing';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();
  const t = useTranslations('LocaleSwitcher');

  const [isPending, startTransition] = useTransition();

  function onSelectChange(nextLocale: Locale) {
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: nextLocale },
      );
    });
  }

  if (routing.locales.length <= 1) return null;

  return (
    <Select defaultValue={locale} disabled={isPending} onValueChange={onSelectChange}>
      <SelectTrigger className="w-28 bg-transparent" disabled={isPending}>
        <SelectValue placeholder={t('label')} />
      </SelectTrigger>
      <SelectContent>
        {routing.locales.map((locale) => (
          <SelectItem key={locale} value={locale}>
            {t('locale', { locale })}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
