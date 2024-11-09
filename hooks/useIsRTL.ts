import { useLocale } from 'next-intl';

export function useIsRTL() {
  const locale = useLocale();
  return locale === 'ar';
}
