import { BaseLayout } from '@/components/layout/BaseLayout';
import { NotFoundLayout } from '@/components/layout/NotFoundLayout';
import { routing } from '@/i18n/routing';

// This page renders when a route like `/unknown.txt` is requested.
// In this case, the layout at `app/[locale]/layout.tsx` receives
// an invalid value as the `[locale]` param and calls `notFound()`.

export default function GlobalNotFound() {
  return (
    <BaseLayout locale={routing.defaultLocale}>
      <NotFoundLayout />
    </BaseLayout>
  );
}
